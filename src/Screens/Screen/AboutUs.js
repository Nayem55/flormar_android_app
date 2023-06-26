import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUsScreen = () => {
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  contact: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  });

export default AboutUsScreen;
