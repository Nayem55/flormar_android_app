import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ProductDetails = ({route}) => {
    const {product} = route.params;
    console.log(product?.images[0]?.src)
    return (
        <View style={styles.container}>
         <Image
          style={styles.image}
          source={{ uri: product?.images[0]?.src }}
        ></Image>
        <View style={styles.details}>
        <Text style={styles.name}>{product?.name}</Text>
        <View style={{ flexDirection: "row", gap: 10 ,alignItems:"center"}}>
          <Text
            style={{
              textDecorationLine: "line-through",
              textDecorationStyle: "solid",
              color: "#000",
              opacity: 0.5,
              fontSize:20
            }}
          >
          {product?.on_sale && `TK. ${product?.regular_price}`}
          </Text>
          <Text style={styles.price}>TK. {product?.on_sale?product?.sale_price:product?.regular_price}</Text>
        </View>
        </View>
        </View>
      );
}

export default ProductDetails;

const styles = StyleSheet.create({

    container:{
        padding:16
,    },
    
    image:{
        height:400,
    },
    details:{
        padding:15
    },
    price:{
        fontSize:22,
        paddingTop:8,
        color:"#ef4f85",
        fontWeight: 'bold',
    },
    name:{
        fontSize:24
    },

    
  });