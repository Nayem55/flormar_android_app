import React, { Component } from "react";
import { Text, View, Image, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
const { width } = Dimensions.get("window");

const styles = {
  container: {
    flex: 1,
  },

  wrapper: {},

  slide: {
    flex: 1,
  },

  slide1: {
    flex: 1,

  },

  slide2: {
    flex: 1,
  },


  image: {
    width,
    flex: 1,
  },
};

export default class extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Swiper activeDotColor="white" style={styles.wrapper} height={200} horizontal={true} autoplay autoplayTimeout={4}>
          <View style={styles.slide}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={require("../Images/slide1.png")}
            />
          </View>
          <View style={styles.slide1}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={require("../Images/slide2.png")}
            />
          </View>
          <View style={styles.slide2}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={require("../Images/slide3.png")}
            />
          </View>
        </Swiper>
        
      </View>
    );
  }
}
