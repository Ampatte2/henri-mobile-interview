import React, { useEffect } from 'react'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import reducers from './redux/reducers';
import { initializeTodos, initializeUsers, initializeFeed, addAvatars } from './redux/actions';
import { Feed, Users, Todos } from './tabs';
import { FeedStackNavigator } from './navigation/FeedScreenStack';

import { Tab } from './components/TabBar';

const BottomTabs = createBottomTabNavigator();
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 1000,
});

const store = createStore(
  reducers, applyMiddleware(thunk.withExtraArgument(instance))
);
//const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    store.dispatch(initializeTodos);
    store.dispatch(initializeUsers);
    store.dispatch(initializeFeed);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
          <BottomTabs.Navigator tabBar={props => <Tab {...props} />}>
            <BottomTabs.Screen name='ToUsers' component={Users} title='Users' />
            <BottomTabs.Screen name='ToFeed' component={FeedStackNavigator} title='Feed' />
            <BottomTabs.Screen name='ToTodos' component={Todos} title='Todos' />
          </BottomTabs.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
