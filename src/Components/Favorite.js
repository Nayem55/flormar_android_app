import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Product from "./Product";

const Favorite = () => {
    const [favProducts,setFavProducts] = useState([]);
    useEffect(()=>{
        fetch(`http://192.168.0.82:5000/getProductsByTags`)
        .then(res=>res.json())
        .then(data=>setFavProducts(data))
    },[])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Most Favorites</Text>
      <View style={styles.underline} />
      <TouchableOpacity>
      <Text style={{marginTop:20}}>View All Products</Text>
      </TouchableOpacity>
      <View style={{flex:1}}>
      <ScrollView horizontal={true}>
      {
        favProducts.slice(0,9).map(product=><Product product={product} key={product?.id}></Product>)
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
    height: 800,
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
