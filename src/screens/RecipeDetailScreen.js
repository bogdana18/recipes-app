import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { ChevronLeftIcon, ClockIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { CachedImage } from '../helpers/image';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { spaceY4,spaceY2 } from '../components/styles';
import { Loading } from '../components/loading';

export default function RecipeDetailScreen(props) {
  let item = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading,setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(()=> {
    getMealData(item.idMeal);
    setLoading(false);
  },[])

  const getMealData = async (id)=>{
    try{
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if(response && response.data) {
        setMeal(response.data.meals[0]);
      }
    }catch(err){
       console.log('error2: ', err.message);
    }
  }

  return (
    <ScrollView
      style={tw`bg-white flex-1`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}
    >
      <StatusBar style={"light"}/>
      {/*recipe image*/}
      <View style={tw`flex-row justify-center`}>
        <CachedImage
          uri={item.strMealThumb}
          style={{width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40,borderBottomRightRadius: 40, marginTop: 4}}
        />
      </View>

      <View style={tw`w-full absolute flex-row items-center justify-between pt-14`}>
        <TouchableOpacity 
          style={tw`p-2 rounded-full ml-5 bg-white`}
          onPress={()=>navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24"/>
        </TouchableOpacity>

        <TouchableOpacity 
          style={tw`p-2 rounded-full ml-5 bg-white`}
          onPress={()=>setIsFavourite(!isFavourite)}
        >
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite? "red": "gray"}/>
        </TouchableOpacity>
      </View>

      {/*Meal desc */}
      {
        loading?(
          <Loading size="large" style={tw`mt-16`}/>
        ): 
        (
          <View style={[tw`px-4 flex justify-between pt-8`,{spaceY4}]}>
            <View style={spaceY2}>
              <Text style={[{fontSize: hp(3)}, tw`font-bold flex-1 text-neutral-700`]}>
                {meal?.strMeal}
              </Text>

              <Text style={[{fontSize: hp(2)}, tw`font-medium flex-1 text-neutral-500`]}>
                {meal?.strArea}
              </Text>
            </View>

            {/*misc*/}

            <View style={tw`flex-row justify-around`}>
              <View style={tw`flex rounded-full bg-amber-300 p-2`}>
                <View style={[{height: hp(6.5), width: hp(6.5)}, tw`bg-white rounded-full flex item-center justify-center`]}>
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>
                </View>

                <View style={tw`flex items-center py-2 justify-center`}>
                  <Text style={[tw`font-bold text-neutral-700`,{fontSize:hp(2)}]}>
                    -
                  </Text>
                  <Text style={[tw`font-bold text-neutral-700`,{fontSize:hp(1.3)}]}>
                    Mins
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )
      }
    </ScrollView>
  )
}
