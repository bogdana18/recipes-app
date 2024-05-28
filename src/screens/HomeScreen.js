import { View, Text, ScrollView, Image, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import tw from 'twrnc';
import axios from 'axios';
import { spaceY6,spaceY2 } from '../components/styles';
import Categories from '../components/categories';
import Recipes from '../components/recipes';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(()=> {
    getCategories();
    getRecipes();
  },[]);

  const HandleChangeCategory = (category) =>{
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const getCategories = async ()=>{
    try{
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      //console.log('got categories',response.data);
      if(response && response.data) {
        setCategories(response.data.categories);
      }
    }catch(err){
       console.log('error1: ', err.message);
    }
  }

  const getRecipes = async (category="Beef")=>{
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if(response && response.data) {
        setMeals(response.data.meals);
      }
    }catch(err){
       console.log('error2: ', err.message);
    }
  }

  const filteredMeals = meals.filter(meal => meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={tw`flex-1 bg-white`}>
    <StatusBar style='dark'/>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 50}}
      style={[tw`pt-14`,{spaceY6}]}
    >

    <View style={tw `mx-4 flex-row justify-between items-center mb-2`}>
      <Image source={require("../../assets/avatar-girl-svgrepo-com.png")} style={{height: hp(5), width: hp(5.5)}}/>
      <BellIcon size={hp(4)} color="grey"></BellIcon>
    </View>

    <View style={[tw`mx-4 mb-2`,{spaceY2}]}>
      <Text style={[tw`text-neutral-600`, {fontSize: hp(1.7)}]}>Hello!</Text>
      <View>
        <Text style={[tw`font-semibold text-neutral-600`,{fontSize: hp(3.8)}]}>Make your own food,</Text>
      </View>
      <Text style={[tw`font-semibold text-neutral-600`,{fontSize: hp(3.8)}]}>
        stay at <Text style={tw`text-amber-400`}>home</Text>
      </Text>
    </View>

    <View style={tw`mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]`}>
      <TextInput 
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        placeholder='Search any recipe'
        placeholderTextColor={'grey'}
        style={[tw`flex-1 text-base mb-1 pl-3 tracking-wider`,{fontSize: hp(1.7)}]}
      />
      <View style={tw`bg-white rounded-full p-3`}>
        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="grey"/>
      </View>
    </View>

    <View>
      {categories.length > 0 && 
        <Categories 
          categories={categories} 
          activeCategory={activeCategory} 
          HandleChangeCategory={HandleChangeCategory}
        />
      }
    </View>
    {/*recipes*/}
    <View>
      <Recipes categories={categories} meals={filteredMeals}/>
    </View>

    </ScrollView>
  </View>
  )
}