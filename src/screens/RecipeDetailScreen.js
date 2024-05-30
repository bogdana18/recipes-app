import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { ChevronLeftIcon, ClockIcon, Square3Stack3DIcon } from 'react-native-heroicons/outline';
import { HeartIcon, UserIcon, FireIcon } from 'react-native-heroicons/solid';
import { CachedImage } from '../helpers/image';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { styles } from '../components/styles';
import Loading  from '../components/loading';
import YouTubeIframe from 'react-native-youtube-iframe';

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

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal['strIngredient' + i] && meal['strMeasure' + i].trim() !== "") {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYouTubeVideoId = url => {
    const reqex = /[?&]v=([^&]+)/;
    const match = url.match(reqex);
    if (match && match[1]){
      return match[1];
    }

    return null;
  }

  return (
    <ScrollView
      style={tw`bg-white flex-1`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}
    >
      <StatusBar style={"light"}/>
      {/*recipe image*/}
      <View style={[tw`flex-row justify-center`]} >
        <CachedImage
          uri={item.strMealThumb}
          sharedTransitioTag={item.strMeal}
          style={{width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40,borderBottomRightRadius: 40, marginTop: 4}}
        />
      </View>

      <Animated.View entering={FadeIn.delay(200).duration(1000)} style={tw`w-full absolute flex-row items-center justify-between pt-14`}>
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
      </Animated.View>

      {/*Meal desc */}
      {
        loading?(
          <Loading size="large" style={tw`mt-16`}/>
        ): 
        (
          <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} style={[tw`px-4 flex justify-between pt-8`,styles.spaceY4]}>
            <View style={styles.spaceY2}>
              <Text style={[{fontSize: hp(3)}, tw`font-bold flex-1 text-neutral-700`]}>
                {meal?.strMeal}
              </Text>

              <Text style={[styles.spaceY2,{fontSize: hp(2)}, tw`font-medium flex-1 text-neutral-500`]}>
                {meal?.strArea}
              </Text>
            </View>

            {/*misc*/}

            <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} style={[tw`flex-row justify-around`, styles.spaceY2]}>
              <View style={tw`flex items-center justify-center bg-amber-300 p-2 rounded-full`}>
                <View style={[{height: hp(6.5), width: hp(6.5)}, tw`bg-white rounded-full items-center justify-center`]}>
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>
                </View>

                <View style={tw`flex items-center py-2 justify-center`}>
                  <Text style={[tw`font-bold text-neutral-700`,{fontSize:hp(2)}]}>
                    35
                  </Text>
                  <Text style={[tw`font-bold text-neutral-700`,{fontSize:hp(1.3)}]}>
                    Mins
                  </Text>
                </View>
              </View>

              <View style={tw`flex items-center justify-center bg-amber-300 p-2 rounded-full`}>
                <View style={[{height: hp(6.5), width: hp(6.5)}, tw`bg-white rounded-full items-center justify-center`]}>
                  <UserIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>
                </View>

                <View style={tw`flex items-center py-2 justify-center`}>
                  <Text style={[tw`font-bold text-neutral-700`,{fontSize:hp(2)}]}>
                    03
                  </Text>
                  <Text style={[tw`font-bold text-neutral-700`,{fontSize:hp(1.3)}]}>
                    Servings
                  </Text>
                </View>
              </View>

              <View style={tw`flex items-center justify-center bg-amber-300 p-2 rounded-full`}>
                <View style={[{height: hp(6.5), width: hp(6.5)}, tw`bg-white rounded-full items-center justify-center`]}>
                  <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>
                </View>

                <View style={tw`flex items-center py-2 justify-center`}>
                  <Text style={[tw`font-bold text-neutral-700`,{fontSize:hp(2)}]}>
                    103
                  </Text>
                  <Text style={[tw`font-bold text-neutral-700`,{fontSize:hp(1.3)}]}>
                    Cal
                  </Text>
                </View>
              </View>

              <View style={tw`flex items-center justify-center bg-amber-300 p-2 rounded-full`}>
                <View style={[{height: hp(6.5), width: hp(6.5)}, tw`bg-white rounded-full items-center justify-center`]}>
                  <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>
                </View>

                <View style={tw`flex items-center py-2 justify-center`}>
                  <Text style={[tw`font-bold text-neutral-700`,{fontSize:hp(2)}]}>
                    
                  </Text>
                  <Text style={[tw`font-bold text-neutral-700`,{fontSize:hp(1.3)}]}>
                    Easy
                  </Text>
                </View>
              </View>
            </Animated.View>
            
            {/*Ingredients*/}
            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)}>
              <Text style={[{fontSize: hp(1.5)},tw`font-bold flex-1 text-neutral-700`,styles.spaceY3]}>
                Ingredients
              </Text>

              <View style={[tw`ml-3`, styles.spaceY2]}>
                {
                  ingredientsIndexes(meal).map(i=>{
                    return (
                      <View key={i} style={tw`flex-row space-x-4`}>
                        <View style={[{height: hp(1.5), width: hp(1.5)}, tw`bg-amber-500 rounded-full`]}/>
                          <Text style={[tw`font-extrabold text-neutral-700`,{fontSize: hp(1.7)}]}>  {meal['strMeasure'+i]}  </Text>
                          <Text style={[tw`font-medium text-neutral-600`,{fontSize: hp(1.7)}]}>{meal['strIngredient'+i]}</Text>
                      </View>
                    )
                  })
                }
              </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} style={tw`styles.spaceY4`}>
              <Text style={[{fontSize: hp(1.5)},tw`font-bold flex-1 text-neutral-700`,styles.spaceY3]}>
                Instructions
              </Text>
              <Text style={[tw`text-neutral-700`, {fontSize: hp(1.6)}]}>
                {
                  meal?.strInstructions
                }
              </Text>
            </Animated.View>

          {/*Ingredients*/}
          {
            meal?.strYoutube && (
              <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} style={styles.spaceY4}>
                <Text style={[tw`font-bold flex-1 text-neutral-700`,{fontSize: hp(2.5)}]}>
                  Recipe Video
                </Text>

                <View>
                  <YouTubeIframe 
                    videoId={getYouTubeVideoId(meal.strYoutube)}
                    height={hp(30)}
                  />
                </View>
              </Animated.View>
            )
          }
          </Animated.View>
        )
      }
    </ScrollView>
  )
}
