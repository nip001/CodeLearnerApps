import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { Component } from 'react'
import Router from './Router';

const Drawer = createDrawerNavigator();

export class DrawerList extends Component {
    render() {
        return (
            <Drawer.Navigator
                initialRouteName="Menu Awal"
            >
              <Drawer.Screen name="Menu Awal" component={Router} />
            </Drawer.Navigator>
        )
    }
}

export default DrawerList
