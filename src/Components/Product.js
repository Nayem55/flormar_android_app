import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import StarRating from "./Ratings";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../Redux/Slices/CartSlice";
import Toast from "react-native-toast-message";

const Product = ({ product, cart, setCart }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Product Details", { product: product })
        }
        style={styles.productImage}
      >
        {(product?.on_sale && product?.stock_quantity>0) && (
         <TouchableOpacity style={{ position: "absolute", top: 8 ,left:8 ,backgroundColor:"#e7205b",paddingHorizontal:10,zIndex: 1,borderRadius:50,paddingVertical:14}}>
         <Text style={{color:"#fff"}}>
            -
            {
              Math.floor(((product.regular_price - product.sale_price) * 100) /
              product.regular_price)
              }
            %
          </Text>
         </TouchableOpacity>
        )}
        {product?.stock_quantity<1 && (
         <TouchableOpacity style={{ position: "absolute", top: 8 ,left:8 ,backgroundColor:"#cccccc",padding:10,zIndex: 1,borderRadius:50,justifyContent:"center",alignItems:"center"}}>
         <Text style={{color:"#000",height:30,width:30,textAlign:"center",fontSize:12}}>SOLD OUT</Text>
         </TouchableOpacity>
        )}

        <Image
          style={styles.image}
          source={{ uri: product?.images[0]?.src }}
        ></Image>
      </TouchableOpacity>
      <View style={styles.details}>
        <Text numberOfLines={2}>{product?.name}</Text>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <StarRating rating={product.average_rating} size={16}></StarRating>
          <Text style={{ color: "#000", opacity: 0.5, marginTop: 8 }}>
            ({product.rating_count})
          </Text>
        </View>
        <View style={{ position: "absolute", top: 70 }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text style={styles.price}>
              TK.{" "}
              {(product?.on_sale && product?.stock_quantity>0) ? product?.sale_price : product?.regular_price}
            </Text>
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
          <TouchableOpacity
            disabled={product.stock_quantity<1}
            onPress={() => {
              dispatch(addItemToCart(product));
              Toast.show({
                type: "success",
                text1: "ADDED TO CART",
                position: "top",
              });
            }}
            style={[styles.button, product.stock_quantity < 1 && styles.outStock]}
          >
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
    height: 300,
    marginBottom: 150,
    marginLeft: 10,
    marginRight: 10,
    position: "relative",
  },
  productImage: {
    backgroundColor: "#fff",
    width: "100%",
    height: 250,
    marginTop: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    position: "relative",
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
    fontSize: 18,
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
  outStock:{
    backgroundColor:"#cccccc"
  }
});
