import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  margin: 0 20px 20px;
`;

export const EventImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 4px;
  align-self: center;
`;

export const Wrapper = styled.View`
  flex: 1;
  padding: 20px;
`;

export const EventTitle = styled.Text`
  color: #333;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const EventDate = styled.Text`
  color: #999;
  font-size: 16px;
  margin: 0 0 10px 20px;
`;

export const EventLocation = styled.Text`
  color: #999;
  font-size: 16px;
  margin: 0 0 10px 20px;
`;

export const EventOrganizer = styled.Text`
  color: #999;
  font-size: 16px;
  margin: 0 0 10px 20px;
`;

export const SubscribeButton = styled(Button)`
  background: #f94d6a;
`;

export const UnsubscribeButton = styled(Button)`
  background: #d44059;
`;
