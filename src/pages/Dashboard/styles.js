import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const DateChooser = styled.View`
  margin: 20px 0;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DateChooserButton = styled(RectButton)`
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

export const DateDisplay = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin: 0 20px;
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

export const EventSubscribedText = styled.Text`
  color: #666;
  font-size: 14px;
  text-align: center;
`;

export const ActionButton = styled(Button)`
  background: #f94d6a;
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
