import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feed, Users, Todos } from '../tabs';

const BottomTabs = createBottomTabNavigator();


export const BottomTabNavigator = (
    
) => {
    return (
        <BottomTabs.Navigator>
            <BottomTabs.Screen name='ToUsers' component={Users} title='Users' />
            <BottomTabs.Screen name='ToFeed' component={Feed} title='Feed' />
            <BottomTabs.Screen name='ToTodos' component={Todos} title='Todos' />
          </BottomTabs.Navigator>
    )
}
