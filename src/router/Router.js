
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react'
import Login from '../page/Login';
import MenuAwal from '../page/MenuAwal';

const Stack = createStackNavigator();

export class Router extends Component {
    render() {
        return (
            <Stack.Navigator
                screenOptions={{
                headerShown: true
                }}
            >
                <Stack.Screen name="Code Learner" component={MenuAwal}/>
                <Stack.Screen name="Login" component={Login}/>
                
            </Stack.Navigator>
        )
    }
}

export default Router
