import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  MeetupsList,
  Meetup,
  EventImage,
  Wrapper,
  Title,
  Date,
  Location,
  Organizer,
  ActionButton,
  ListEmpty,
  ListEmptyText,
} from './styles';

function Subscriptions({ isFocused }) {
  const [loading, setLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);

  async function loadMeetups() {
    try {
      setLoading(true);

      const response = await api.get('subscriptions');

      setMeetups(
        response.data.map(meetup => ({
          ...meetup,
          loading: false,
        }))
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isFocused) loadMeetups();
  }, [isFocused]);

  async function handleAction(id) {
    try {
      setMeetups(
        meetups.map(meetup => ({
          ...meetup,
          loading: meetup.id === id,
        }))
      );

      const response = await api.delete(`subscriptions/${id}`);

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
                  <Title>{item.title}</Title>
                  <Date>{item.date}</Date>
                  <Location>{item.location}</Location>
                  <Organizer>{item.user.name}</Organizer>

                  <ActionButton
                    onPress={() => handleAction(item.id)}
                    loading={item.loading}
                  >
                    Cancelar inscrição
                  </ActionButton>
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
                <ListEmptyText>
                  Você não está inscrito em nenhum evento ainda.
                </ListEmptyText>
              </ListEmpty>
            )}
          />
        )}
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="local-offer" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon,
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
