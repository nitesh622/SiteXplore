import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './Screens/HomePage';
import Discover from './Screens/Discover';
import ItemScreen from './Screens/ItemScreen';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='HomePage'
          component={HomePage}
        />
        <Stack.Screen 
          name='Discover'
          component={Discover}
        />
        <Stack.Screen 
          name='ItemScreen'
          component={ItemScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({}) 