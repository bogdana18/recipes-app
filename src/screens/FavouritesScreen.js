import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { getFavouriteRecipes } from '../helpers/storage';
import { CachedImage } from '../helpers/image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')} 
        >
          <ChevronLeftIcon strokeWidth={4.5} color="#black"/>
        </TouchableOpacity>
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
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
