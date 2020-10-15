import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { NavigationContainer, createStackNavigator } from 'react-navigation';
import Settings from './src/screens/SettingsScreen';
import CreateStart from './src/screens/CreateStartScreen';
import CreateEdit from './src/screens/CreateEditScreen';
import Exercise from './src/screens/ExerciseScreen';
import Rest from './src/screens/RestScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateStart">
        <Stack.Screen name="CreateStart" component={CreateStart} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="CreateEdit" component={CreateEdit} />
        <Stack.Screen name="Exercise" component={Exercise} />
        <Stack.Screen name="Rest" component={Rest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
