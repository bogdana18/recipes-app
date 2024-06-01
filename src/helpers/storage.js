import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to get favourite recipes
export const getFavouriteRecipes = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('favourites');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to fetch favourites", e);
  }
};

// Function to save favourite recipes
export const saveFavouriteRecipes = async (favourites) => {
  try {
    const jsonValue = JSON.stringify(favourites);
    await AsyncStorage.setItem('favourites', jsonValue);
  } catch (e) {
    console.error("Failed to save favourites", e);
  }
};
