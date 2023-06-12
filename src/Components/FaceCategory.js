import { View, Text, ScrollView, Dimensions, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Product from "./Product";

const { height, width } = Dimensions.get("window");

const FaceCategory = () => {
  const [faceProducts, setFaceProducts] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetch(`http://192.168.1.128:5000/getProductsByCategories`)
      .then((res) => res.json())
      .then((data) => setFaceProducts(data));
  }, []);
  return (
    <ScrollView style={{backgroundColor:"#fceef2"}} horizontal={false}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.categoryBar}>
        <TouchableOpacity style={styles.categoryBarButton}>
          <Text style={styles.categoryBarText}>FOUNDATION</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBarButton}>
          <Text style={styles.categoryBarText}>BLUSH ON</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBarButton}>
          <Text style={styles.categoryBarText}>FACE POWDER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBarButton}>
          <Text style={styles.categoryBarText}>CONCEALER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBarButton}>
          <Text style={styles.categoryBarText}>PRIMER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBarButton}>
          <Text style={styles.categoryBarText}>CONTOUR/HIGHLIGHTER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBarButton}>
          <Text style={styles.categoryBarText}>GEL/CREAM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBarButton}>
          <Text style={styles.categoryBarText}>FIXER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBarButton}>
          <Text style={styles.categoryBarText}>MASK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBarButton}>
          <Text style={styles.categoryBarText}>TONIC</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBarButton}>
          <Text style={styles.categoryBarText}>CLEANER/REMOVER</Text>
        </TouchableOpacity>

        </ScrollView>
        <View  style={styles.container}>
         {
        faceProducts.map((product) => (
            <Product product={product} key={product.id}></Product>
      ))}
    </View>
    </ScrollView>
  );
};

export default FaceCategory;

const styles = {
  container: {
    width:"100%",
    padding:10,
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"center",
    paddingLeft:20,
  },
  categoryBar:{
    width:"100%",
    height:60,
    backgroundColor:"#ef4f85",
    marginTop:20, 
    padding:15,
   },
   categoryBarButton:{
      marginRight:10,
      backgroundColor:"#fff",
      paddingLeft:10,
      paddingRight:10,
      paddingTop:6,
      paddingBottom:6,
      borderRadius:20
   },
   categoryBarText:{
      color:"#000",
      fontWeight: 'bold',
      fontSize:12,
      justifyContent:"center",
      alignItems:"center"
   },
};
