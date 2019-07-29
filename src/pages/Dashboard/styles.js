import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const DateChooser = styled.View`
  margin: 20px 0;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DateChooserButton = styled(RectButton)``;

export const DateDisplay = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin: 0 20px;
`;

export const MeetupsList = styled.FlatList``;
