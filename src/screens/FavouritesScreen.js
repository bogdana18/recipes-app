import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { getFavouriteRecipes } from '../helpers/storage';
import { CachedImage } from '../helpers/image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function FavouritesScreen() {
  const [favourites, setFavourites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    const favs = await getFavouriteRecipes();
    setFavourites(favs);
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={tw`pt-14`}
      >
        <Text style={tw`text-xl font-bold text-center my-4`}>Favourites</Text>
        <View style={tw`px-4`}>
          {favourites.length === 0 ? (
            <Text style={tw`text-center text-gray-500`}>No favourite recipes yet.</Text>
          ) : (
            favourites.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={tw`mb-4`}
                onPress={() => navigation.navigate('RecipeDetail', { ...item })}
              >
                <View style={tw`flex-row items-center`}>
                  <CachedImage
                    uri={item.strMealThumb}
                    style={{ width: wp(20), height: hp(10), borderRadius: 10 }}
                  />
                  <Text style={tw`ml-4 text-lg font-semibold`}>{item.strMeal}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
