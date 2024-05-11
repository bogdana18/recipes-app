import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('HomeScreen'); 
        }, 3000);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/start-logo.svg')}
                style={styles.logo}
            />
            <Text style={styles.title}>Recipes</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100, 
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default SplashScreen;
