import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

// import { Container } from './styles';

export default function Test() {
  return <Background />;
}

Test.navigationOptions = {
  tabBarLabel: 'Test',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="build" size={20} color={tintColor} />
  ),
};
