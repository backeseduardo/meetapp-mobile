import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import { Container, MeetupsList, ListEmpty, ListEmptyText } from './styles';

function Subscriptions({ isFocused }) {
  const [loading, setLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);

  async function loadMeetups() {
    try {
      const response = await api.get('subscriptions');

      setMeetups(
        response.data.map(meetup => ({
          ...meetup,
          subscribed: true,
        }))
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isFocused) loadMeetups();
  }, [isFocused]);

  function handleUnsubscribe(id) {
    // setMeetups(meetups.filter(meetup => meetup.id !== id));
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
              <Meetup data={item} onUnsubscribe={handleUnsubscribe} />
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
