import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import tw from 'twrnc';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';

export default function Categories({categories,activeCategory,HandleChangeCategory}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        onPress={()=> HandleChangeCategory(cat.strCategory)}
        style={tw`space-x-4`}
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
          categories.map((cat, index)=> {
            let isActive = cat.strCategory == activeCategory;
            let activeButtonClass = isActive? ' bg-amber-400': ' bg-black/100';
            return (
              <TouchableOpacity
              key={index}
              style={tw`flex items-center space-y-1`}
              >
                <View style={tw`rounded-full p-[6px]`}>
                  {/*<Image 
                    source={{uri: cat.strCategoryThumb}}
                    style={[tw`rounded-full`, {width: hp(6)}, {height: hp(6)}]}
            />*/}
                    <CachedImage 
                      uri={cat.strCategoryThumb}
                      style={[tw`rounded-full`, {width: hp(6)}, {height: hp(6)}]}
                    />
                  <Text style={[tw`text-neutral-600`,{fontSize: hp(1.6)}]}>
                    {cat.strCategory}
                  </Text>
                  
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </Animated.View>
  );
}