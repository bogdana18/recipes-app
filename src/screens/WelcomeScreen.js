import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { styles } from '../components/styles';

export default function WelcomeScreen() {

  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(5)), 100);
    setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5.5)), 300);

    setTimeout(() => navigation.navigate('Home'), 2500);
  }, []);

  return (
    <View style={[tw`flex-1 justify-center items-center bg-amber-500`]}>
      <StatusBar style="light" />

      <Animated.View style={[tw`bg-white/20 rounded-full`, { padding: ring2padding }]}>
        <Animated.View style={[tw`bg-white/20 rounded-full`, { padding: ring1padding }]}>
          <Image source={require('../../assets/fried-chicken-meal-svgrepo-com.png')}
            style={{ width: hp(20), height: hp(20) }} />
        </Animated.View>
      </Animated.View>

      <View style={[tw`flex items-center`,styles.spaceY2]}>
        <Text style={[tw`font-bold text-white tracking-widest`, { fontSize: hp(7) }]}>
          Foody
        </Text>
        <Text style={[tw`font-medium text-white tracking-widest`, { padding: hp(2),fontSize: hp(2.5) }]}>
          Food is always right
        </Text>
  </View>
    </View>
  );
}
