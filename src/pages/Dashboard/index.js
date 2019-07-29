import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

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
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const formattedDate = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: {
          page: 1,
          date: format(date, 'yyyy-MM-dd'),
        },
      });

      setMeetups(response.data.rows);
    }

    loadMeetups();
  }, [date]);

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

        <MeetupsList
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Meetup data={item} />}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
