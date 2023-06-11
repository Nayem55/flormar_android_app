import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Swiper from '../../Components/Swiper';
import Favorite from '../../Components/Favorite';

const Home = () => {
  return (
    <ScrollView>
    <View>
      <Swiper></Swiper>
    </View>
    <View>
      <Favorite></Favorite>
    </View>
    </ScrollView>
  )
}

export default Home;

const styles = {



}