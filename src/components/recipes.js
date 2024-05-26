import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import tw from 'twrnc';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';

export default function Recipes({categories, meals}) {
  return (
  <View style={tw`mx-4 space-y-3`}>
    <Text style={[tw`font-semibold text-neutral-600`, {fontSize: hp(3)}]}>Recipes</Text>
    <View>
      {
        categories.length==0 || meals.length==0? (
          <Loading size="large" style={tw`mt-20`}/>
        ) :  (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item,i}) => <RecipeCard item={item} index={i} />}
            onEndReachedThreshold={0.1}
          />
        )
      }
    </View>
  </View>
  )
}

const RecipeCard = ({item,index})=> {
  let isEven = index%2 == 0;
  return (
  <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
    <Pressable
      style={[tw`flex justify-center mb-4 space-y-1`, {width:'100%', paddingLeft: isEven? 0:8,paddingRight: isEven? 0:8}]}
    >
      <Image
        source={{uri: item.strMealThumb}}
        style={[tw`bg-black/5`,{width: '100%',height: index%3==0?hp(25): hp(35), borderRadius: 35}]}
      />
      <Text style={[tw`font-semibold ml-2 text-neutral-600`, {fontSize: hp(1.5)}]}>
        {
          item.strMeal.length>20? item.strMeal.slice(0,20)+'...': item.strMeal
        }
      </Text>
    </Pressable>
  </Animated.View>
  )
}