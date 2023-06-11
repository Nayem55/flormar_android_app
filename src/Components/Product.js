import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const Product = ({product}) => {
  return (
    <View style={styles.container}>
      <View style={styles.productImage}>
        <Image
          style={styles.image}
          source={{uri:product?.images[0].src}}
        ></Image>
      </View>
      <View style={styles.details}>
        <Text>{product?.name}</Text>
        <View style={{flexDirection:"row", gap:10}}>
          <Text
            style={{
              textDecorationLine: "line-through",
              textDecorationStyle: "solid",
              color: "#000",
              opacity: 0.5,
            }}
          >
            TK. 350
          </Text>
          <Text style={styles.price}>TK. 450</Text>
        </View>
        <TouchableOpacity style={styles.button}>
            <Text style={{color:"#fff"}}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Product;

const styles = {
  container: {
    flex: 1,
    width: "50%",
  },
  productImage: {
    backgroundColor: "#fff",
    height: 250,
    marginTop: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 250,
  },
  details: {
    marginTop: 10,
  },
  price: {
    color: "#ef4f85",
  },
  button:{
    width:"50%",
    padding:8,
    backgroundColor:"#ef4f85",
    marginTop:10,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5
  }
};
