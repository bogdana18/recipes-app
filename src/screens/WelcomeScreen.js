import { View, Text, Image } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/*logo image*/}
      <View className="bg-white/20 rounded-full p-10">
        <View className="bg-white/20 rounded-full p-8">
          <Image soutce={require('../../assets/fried-chicken-meal-svgrepo-com.svg')}
            style={{width: 200, height: 200}} />
        </View>
      </View>
      {/*Title*/}
    </View>
  )
}