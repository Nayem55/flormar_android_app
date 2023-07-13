import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';

const AboutUsScreen = () => {
  const [loaded] = useFonts({
    "Roboto-Black": require('../../../assets/fonts/Roboto-Black.ttf'),
    "Roboto-Light": require('../../../assets/fonts/Roboto-Light.ttf'),
    "Roboto-Regular": require('../../../assets/fonts/Roboto-Regular.ttf'),
  });
  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        Welcome to our app! We are a dedicated team of developers passionate about creating innovative solutions.
      </Text>
      <Text style={styles.description}>
        Our mission is to provide high-quality products that enhance the lives of our users.
      </Text>
      <Text style={styles.description}>
        If you have any questions or feedback, please don't hesitate to reach out to us.
      </Text>
      <Text style={styles.contact}>Contact us: info@example.com</Text>
    </View>
  );
  };
  
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#fff"
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    marginBottom: 20,
    fontFamily:"Roboto-Black"
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily:"Roboto-Regular"

  },
  contact: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
    fontFamily:"Roboto-Black"
  },
  });

export default AboutUsScreen;
