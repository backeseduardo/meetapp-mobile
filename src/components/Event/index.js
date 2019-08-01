import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  EventImage,
  Wrapper,
  EventTitle,
  EventDate,
  EventLocation,
  EventOrganizer,
  SubscribeButton,
  UnsubscribeButton,
} from './styles';

export default function Event({ data, onSubscribe, onUnsubscribe }) {
  return (
    <Container>
      <EventImage source={{ uri: data.banner.url }} />

      <Wrapper>
        <EventTitle>{data.title}</EventTitle>
        <EventDate>{data.formattedDate}</EventDate>
        <EventLocation>{data.location}</EventLocation>
        <EventOrganizer>{data.user.name}</EventOrganizer>

        {data.subscribed ? (
          <UnsubscribeButton onPress={onUnsubscribe} loading={data.loading}>
            Cancelar inscrição
          </UnsubscribeButton>
        ) : (
          <SubscribeButton onPress={onSubscribe} loading={data.loading}>
            Realizar inscrição
          </SubscribeButton>
        )}
      </Wrapper>
    </Container>
  );
}

Event.defaultProps = {
  onSubscribe: null,
  onUnsubscribe: null,
};

Event.propTypes = {
  data: PropTypes.shape().isRequired,
  onSubscribe: PropTypes.func,
  onUnsubscribe: PropTypes.func,
};
