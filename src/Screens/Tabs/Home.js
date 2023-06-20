import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import Favorite from '../../Components/Favorite';
import Categories from '../../Components/Categories';
import BannerSwiper from '../../Components/BannerSwiper';
import SummerTrends from '../../Components/SummerTrends';
import NudeMakeUp from '../../Components/NudeMakeUp';
import Resellers from '../../Components/Resellers';

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
    <View style={{flex:1,marginTop:-90,backgroundColor: "#fff",padding:20}}>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Image style={{width: "48%",height: 200,marginTop:25}} source={{uri:"https://flormarbd.com/wp-content/uploads/2023/04/Stay-Perfect-Concealer-2.jpg"}}></Image>
      <Image style={{width: "48%",height: 200,marginTop:25}} source={{uri:"https://flormarbd.com/wp-content/uploads/2023/05/website-Nanner-For-eyes-2.webp"}}></Image>
      </View>
      <Image style={{width: "100%",height: 150,marginTop:18,marginBottom:25}} source={{uri:"https://flormarbd.com/wp-content/uploads/2023/05/website-BIG-Banner-For-NAILS-400x174.webp"}}></Image>
    </View>
    <View>
      <SummerTrends></SummerTrends>
    </View>
    <View>
      <NudeMakeUp></NudeMakeUp>
    </View>
    <View>
      <Resellers></Resellers>
    </View>
    </ScrollView>
  )
}

export default Home;

const styles = {



}