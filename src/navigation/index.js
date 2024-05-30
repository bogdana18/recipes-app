import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={HomeScreen}></Stack.Screen>
        <Stack.Screen name='Welcome' component={WelcomeScreen}></Stack.Screen>
        <Stack.Screen name='RecipeDetail' component={RecipeDetailScreen}></Stack.Screen>
        <Stack.Screen name='FavouritesScreen' component={FavouritesScreen}></Stack.Screen>
        <Stack.Screen name='MapScreen' component={MapScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;