import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const MeetupsList = styled.FlatList.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  flex: 1;
`;

export const Meetup = styled.View`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  margin: 0 20px 20px;
`;

export const EventImage = styled.Image`
  /* width: 470px; */
  width: 100%;
  height: 150px;
  border-radius: 4px;
  align-self: center;
`;

export const Wrapper = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Date = styled.Text`
  color: #999;
  font-size: 16px;
  margin: 0 0 10px 20px;
`;

export const Location = styled.Text`
  color: #999;
  font-size: 16px;
  margin: 0 0 10px 20px;
`;

export const Organizer = styled.Text`
  color: #999;
  font-size: 16px;
  margin: 0 0 10px 20px;
`;

export const ActionButton = styled(Button)`
  background: #d44059;
`;

export const ListEmpty = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const ListEmptyText = styled.Text`
  color: #fff;
  font-size: 24px;
  margin-top: 20px;
`;
