import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AddPost } from '../tabs/feed/AddPost';
import { ViewPost } from '../tabs/feed/ViewPost';
import { Feed } from '../tabs/feed/Feed';

const FeedStack = createStackNavigator();
export const FeedStackNavigator = () => {
    return (
        <FeedStack.Navigator
          initialRouteName='Feed'
        >
          <FeedStack.Screen 
            name='Feed'
            component={Feed}
          />
          <FeedStack.Screen 
            name='Add Post'
            component={AddPost}
          />
          <FeedStack.Screen 
            name='View Post'
            component={ViewPost}
          />
        </FeedStack.Navigator>
    )
}
