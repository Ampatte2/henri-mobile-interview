import React, { useEffect } from 'react'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import axios from 'axios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import reducers from './redux/reducers';
import { initializeTodos, initializeUsers, addAvatars } from './redux/actions';
import { Feed, Users, Todos } from './tabs';


const BottomTabs = createBottomTabNavigator();


export const BottomTabNavigator = (
    
) => {
    return (
        <BottomTabs.Navigator
          initialRouteName='users'
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
            <BottomTabs.Screen name='users' component={Users} title='Users' />
            <BottomTabs.Screen name='feed' component={Feed} title='Feed' />
            <BottomTabs.Screen name='todos' component={Todos} title='Todos' />
          </BottomTabs.Navigator>
    )
}

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 1000,
});

const store = createStore(
  reducers, applyMiddleware(thunk.withExtraArgument(instance))
);
const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const getUI = async () => {
      try {
        const result = await axios.get('https://uifaces.co/api?limit=10', {
          method: 'GET',
          headers: {
            'X-API-KEY': '8A06619F-97584CC7-81DB9794-56C15B69',
            Accept: 'application/json',
            'Cache-Control': 'no-cache'
          }
        })
        if (result.data) store.dispatch(addAvatars(result.data))
      } catch (e) {
        console.log(e)
      }
    }
    getUI();
    store.dispatch(initializeTodos);
    store.dispatch(initializeUsers);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Users'
        >
          <Stack.Screen 
            name='Users'
            component={Users}
          />
          <Stack.Screen 
            name='Feed'
            component={Feed}
          />
          <Stack.Screen 
            name='Todos'
            component={Todos}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
