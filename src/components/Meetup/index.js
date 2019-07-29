import React from 'react';

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
  return (
    <Container>
      <EventImage source={{ uri: data.banner.url }} />

      <Wrapper>
        <Title>{data.title}</Title>
        <Date>{data.date}</Date>
        <Location>{data.location}</Location>
        <Organizer>{data.user.name}</Organizer>

        <ActionButton onPress={() => {}}>Realizar inscrição</ActionButton>
      </Wrapper>
    </Container>
  );
}
