import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import StarRating from "./Ratings";
import useCart from "../Hooks/UseCart";

import { addToDb } from "../CartDb";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../Redux/Slices/CartSlice";

const Product = ({ product,cart,setCart }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate('Product Details',{product:product})} style={styles.productImage}>
        <Image
          style={styles.image}
          source={{ uri: product?.images[0]?.src }}
        ></Image>
      </TouchableOpacity>
      <View style={styles.details}>
        <Text>{product?.name}</Text>
         <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <StarRating rating={product.average_rating} size={16}></StarRating>
          <Text style={{ color: "#000", opacity: 0.5, marginTop:8 }}>
            ({product.rating_count})
          </Text>
        </View>
      <View style={{position:"absolute",top:70}}>
      <View style={{ flexDirection: "row", gap: 10 ,alignItems:"center"}}>
          <Text style={styles.price}>TK. {product?.on_sale?product?.sale_price:product?.regular_price}</Text>
          <Text
            style={{
              textDecorationLine: "line-through",
              textDecorationStyle: "solid",
              color: "#000",
              opacity: 0.5,
            }}
          >
          {product?.on_sale && `TK. ${product?.regular_price}`}
          </Text>
        </View>
        <TouchableOpacity onPress={()=>{
          dispatch(addItemToCart(product))
        }} style={styles.button}>
          <Text style={{ color: "#fff" }}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    width: 160,
    height:300,
    marginBottom:150,
    marginLeft: 10,
    marginRight: 10,
    position:"relative",
  },
  productImage: {
    backgroundColor: "#fff",
    width: "100%",
    height: 250,
    marginTop: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:10
  },
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    marginTop: 10,
    width: "100%",
  },
  price: {
    color: "#ef4f85",
    fontSize:18
  },
  button: {
    width: 160,
    padding: 8,
    backgroundColor: "#ef4f85",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
