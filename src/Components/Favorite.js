import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useNavigation } from "@react-navigation/native";

const Favorite = () => {
    const [favProducts,setFavProducts] = useState([]);
    const navigation = useNavigation();
    useEffect(()=>{
      fetch(`http://192.168.0.30:5000/getProductsByTags`)
      .then(res=>res.json())
      .then(data=>setFavProducts(data))
  },[])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Most Favorites</Text>
      <View style={styles.underline} />
      <TouchableOpacity onPress={()=>navigation.navigate('Products')}>
      <Text style={{marginTop:20}}>View All Products</Text>
      </TouchableOpacity>
      <View style={{flex:1}}>
      <ScrollView horizontal={true}>
      {
        favProducts.map(product=><Product product={product} key={product?.id}></Product>)
      }
      </ScrollView>
      </View>
    </View>
  );
};

export default Favorite;

const styles = {
  container: {
    width: "100%",
    height: 700,
    backgroundColor: "#fceef2",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 25,
    color: "#ef4f85",
    fontFamily: 'monospace',
  },
  underline: {
    width: 100,
    height: 3,
    top: 10,
    backgroundColor: "#ef4f85",
  },
};
