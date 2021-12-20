
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react'
import Login from '../page/Login';
import MenuAwal from '../page/MenuAwal';
import MenuAwalDosen from '../page/MenuAwalDosen';

const Stack = createStackNavigator();

export class Router extends Component {
    render() {
        return (
            <Stack.Navigator
                screenOptions={{
                headerShown: false
                }}
            >
                <Stack.Screen name="Code Learner" component={MenuAwal}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Menu Awal Dosen" component={MenuAwalDosen}/>
            </Stack.Navigator>
        )
    }
}

export default Router
