import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import Store from './src/redux/Store';
import DrawerList from './src/router/DrawerList';

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <DrawerList/>
      </NavigationContainer>
    </Provider>
  );
}