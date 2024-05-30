import AsyncStorage from '@react-native-async-storage/async-storage';

// Функція для отримання вподобаних рецептів
export const getFavouriteRecipes = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('favourites');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch(e) {
    console.error("Failed to fetch favourites", e);
  }
}

// Функція для збереження вподобаних рецептів
export const saveFavouriteRecipes = async (favourites) => {
  try {
    const jsonValue = JSON.stringify(favourites);
    await AsyncStorage.setItem('favourites', jsonValue);
  } catch (e) {
    console.error("Failed to save favourites", e);
  }
}
