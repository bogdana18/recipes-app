import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native'; 
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

export default function MapScreen() {
  const navigation = useNavigation();

  const markers = [
    {
      id: 1,
      title: 'Par Bar',
      description: 'Par Bar near DUIKT',
      coordinate: { latitude: 50.427464, longitude: 30.4758653 }
    },
    {
      id: 2,
      title: 'Buddha-Bar Kyiv',
      description: 'Upscale Asian restaurant & bar',
      coordinate: { latitude: 50.4501, longitude: 30.5234 }
    },
    {
      id: 3,
      title: 'Cafe Varenye',
      description: 'Cozy cafe with Ukrainian cuisine',
      coordinate: { latitude: 50.4473, longitude: 30.5228 }
    },
    {
      id: 4,
      title: 'Puzata Hata',
      description: 'Popular Ukrainian self-service restaurant',
      coordinate: { latitude: 50.4445, longitude: 30.5186 }
    },
    {
      id: 5,
      title: 'Lviv Croissants',
      description: 'Cafe offering a variety of croissants and coffee',
      coordinate: { latitude: 50.4526, longitude: 30.5132 }
    },
    {
      id: 6,
      title: 'Milk Bar',
      description: 'Trendy cafe with desserts and brunch',
      coordinate: { latitude: 50.4439, longitude: 30.5145 }
    },
    {
      id: 7,
      title: 'Fine Family',
      description: 'Family-friendly restaurant',
      coordinate: { latitude: 50.4509, longitude: 30.5217 }
    },
    {
      id: 8,
      title: 'Eshak Restaurant',
      description: 'Casual Uzbek & Middle Eastern cuisine',
      coordinate: { latitude: 50.4321, longitude: 30.4875 }
    },
    {
      id: 9,
      title: 'Slivki Pub',
      description: 'Pub with a variety of drinks and snacks',
      coordinate: { latitude: 50.4289, longitude: 30.4841 }
    },
    {
      id: 10,
      title: 'Mama Manana',
      description: 'Georgian restaurant',
      coordinate: { latitude: 50.4333, longitude: 30.4878 }
    }
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.4501,
          longitude: 30.5234,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')} 
      >
        <ChevronLeftIcon strokeWidth={4.5} color="#black"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
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
  }
});
