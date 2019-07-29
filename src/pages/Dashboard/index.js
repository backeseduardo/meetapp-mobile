import React, { useState, useEffect, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import {
  Container,
  DateChooser,
  DateChooserButton,
  DateDisplay,
  MeetupsList,
} from './styles';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const formattedDate = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadMeetups() {
    setLoading(true);

    const response = await api.get('available', {
      params: {
        page: 1,
        date: format(date, 'yyyy-MM-dd'),
      },
    });

    setMeetups(response.data.rows);
    setLoading(false);
  }

  useEffect(() => {
    loadMeetups();
  }, [date]); // eslint-disable-line

  return (
    <Background>
      <Container>
        <DateChooser>
          <DateChooserButton onPress={() => setDate(subDays(date, 1))}>
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
            renderItem={({ item }) => <Meetup data={item} />}
            refreshing={loading}
            onRefresh={loadMeetups}
          />
        )}
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="event" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon,
};
