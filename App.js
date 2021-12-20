import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import Store from './src/redux/Store';
import DrawerList from './src/router/DrawerList';
import Router from './src/router/Router';

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        {/* <Router/> */}
        <DrawerList/>
      </NavigationContainer>
    </Provider>
  );
}