import React, { useState, useEffect, useMemo } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  format,
  subDays,
  addDays,
  isEqual,
  setMilliseconds,
  setSeconds,
  setMinutes,
  setHours,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  DateChooser,
  DateChooserButton,
  DateDisplay,
  MeetupsList,
  Meetup,
  EventImage,
  Wrapper,
  EventTitle,
  EventDate,
  EventLocation,
  EventOrganizer,
  EventSubscribedText,
  ActionButton,
  ListEmpty,
  ListEmptyText,
} from './styles';

function Dashboard({ isFocused }) {
  const [loading, setLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [today, setToday] = useState(true);

  const formattedDate = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadMeetups() {
    try {
      const response = await api.get('available', {
        params: {
          page: 1,
          date: format(date, 'yyyy-MM-dd'),
        },
      });

      setMeetups(response.data.rows);
    } catch (err) {
      Alert.alert(
        'Erro ao carregar meetups',
        'Algo de errado ao carregar meetups, tente novamente mais tarde.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();

      const checkDate = setMilliseconds(
        setSeconds(setMinutes(setHours(date, 0), 0), 0),
        0
      );
      const checkToday = setMilliseconds(
        setSeconds(setMinutes(setHours(new Date(), 0), 0), 0),
        0
      );

      setToday(isEqual(checkDate, checkToday));
    }
  }, [date, isFocused]); // eslint-disable-line

  async function handleAction(id) {
    try {
      setMeetups(
        meetups.map(meetup => ({
          ...meetup,
          loading: meetup.id === id,
        }))
      );

      const response = await api.put(`subscriptions/${id}`);

      if (response.error) {
        Alert.alert('Erro', response.error);
        return;
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        Alert.alert('Erro', err.response.data.error);
      } else {
        Alert.alert('Erro', 'Erro desconhecido, tente novamente mais tarde.');
      }
    } finally {
      loadMeetups();
    }
  }

  return (
    <Background>
      <Container>
        <DateChooser>
          <DateChooserButton
            disabled={today}
            onPress={() => !today && setDate(subDays(date, 1))}
          >
            <Icon name="chevron-left" size={24} color="#fff" />
          </DateChooserButton>

          <DateDisplay>{formattedDate}</DateDisplay>

          <DateChooserButton onPress={() => setDate(addDays(date, 1))}>
            <Icon name="chevron-right" size={24} color="#fff" />
          </DateChooserButton>
        </DateChooser>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <MeetupsList
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup>
                <EventImage source={{ uri: item.banner.url }} />

                <Wrapper>
                  <EventTitle>{item.title}</EventTitle>
                  <EventDate>{item.date}</EventDate>
                  <EventLocation>{item.location}</EventLocation>
                  <EventOrganizer>{item.user.name}</EventOrganizer>

                  {item.subscribed ? (
                    <EventSubscribedText>
                      Você está inscrito neste evento
                    </EventSubscribedText>
                  ) : (
                    <ActionButton
                      onPress={() => handleAction(item.id)}
                      loading={item.loading}
                    >
                      Realizar inscrição
                    </ActionButton>
                  )}
                </Wrapper>
              </Meetup>
            )}
            refreshing={loading}
            onRefresh={loadMeetups}
            ListEmptyComponent={() => (
              <ListEmpty>
                <IconCommunity
                  name="emoticon-sad-outline"
                  size={40}
                  color="#fff"
                />
                <ListEmptyText>Nenhum evento nesse dia.</ListEmptyText>
              </ListEmpty>
            )}
          />
        )}
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="format-list-bulleted" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon,
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
