import React, { useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';

import {
  Container,
  EventImage,
  Wrapper,
  Title,
  Date,
  Location,
  Organizer,
  ActionButton,
} from './styles';

export default function Meetup({ data }) {
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(data.subscribed);

  async function handleAction() {
    try {
      setLoading(true);

      if (subscribed) {
        const response = await api.delete(`subscriptions/${data.id}`);

        if (response.error) {
          Alert.alert('Erro', response.error);
          return;
        }

        setSubscribed(false);
      } else {
        const response = await api.put(`subscriptions/${data.id}`);

        if (response.error) {
          Alert.alert('Erro', response.error);
          return;
        }

        setSubscribed(true);
      }
    } catch (err) {
      Alert.alert('Erro', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <EventImage source={{ uri: data.banner.url }} />

      <Wrapper>
        <Title>{data.title}</Title>
        <Date>{data.date}</Date>
        <Location>{data.location}</Location>
        <Organizer>{data.user.name}</Organizer>

        <ActionButton
          onPress={handleAction}
          subscribed={subscribed}
          loading={loading}
        >
          {subscribed ? 'Cancelar inscrição' : 'Realizar inscrição'}
        </ActionButton>
      </Wrapper>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    banner: PropTypes.shape({
      url: PropTypes.string,
    }),
    title: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
    subscribed: PropTypes.bool,
  }).isRequired,
};
