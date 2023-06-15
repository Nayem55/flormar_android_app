import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Product = ({ product }) => {
  const navigation = useNavigation();
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
      <View style={{position:"absolute",top:60}}>
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
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "#fff" }}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default Product;

const styles = {
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
    width: "100%",
    padding: 8,
    backgroundColor: "#ef4f85",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
};
