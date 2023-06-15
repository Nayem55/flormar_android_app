import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Favorite from '../../Components/Favorite';
import Categories from '../../Components/Categories';
import BannerSwiper from '../../Components/BannerSwiper';

const Home = () => {
  return (
    <ScrollView>
    <View>
      <BannerSwiper></BannerSwiper>
    </View>
    <View>
      <Categories></Categories>
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