import React from 'react'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MyContacts from './screens/MyContacts'
import CreateContact from './screens/CreateContact'
import Profile from './screens/Profile'
import UpdateContact from './screens/UpdateContact';
import FavContacts from './screens/FavContacts';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MyContacts'>
        <Stack.Screen name='Contact List' component={MyContacts} />
        <Stack.Screen name='Add New Contact' component={CreateContact} />
        <Stack.Screen name='Update Contact' component={UpdateContact} />
        <Stack.Screen name='Favorite Contact List' component={FavContacts} />
        <Stack.Screen name='Profile' component={Profile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
