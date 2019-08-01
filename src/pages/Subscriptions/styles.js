import styled from 'styled-components/native';

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
