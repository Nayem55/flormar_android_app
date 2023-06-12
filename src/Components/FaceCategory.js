import { View, Text, ScrollView, Dimensions, SafeAreaView } from "react-native";
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
    <ScrollView horizontal={false}>
        <SafeAreaView  style={styles.container}>
         {
        faceProducts.map((product) => (
            <Product product={product} key={product.id}></Product>
      ))}
    </SafeAreaView>
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
    justifyContent:"center"

  },
};
