import {
  View,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Product from "../Product";

const EyesCategory = () => {
  const [faceProducts, setFaceProducts] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState(0)
  const [id,setId] = useState(71)
  const navigation = useNavigation();
  useEffect(() => {
    setFaceProducts([])
      fetch(`http://192.168.1.128:5000/getProductsByCategories?id=${id}`)
      .then((res) => res.json())
      .then((data) => setFaceProducts(data));
  }, [selectedCategory]);


  return (
    <ScrollView style={{ backgroundColor: "#fceef2" }} horizontal={false}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.categoryBar}
      >
        <TouchableOpacity onPress={()=>{
          setSelectedCategory(1);
          setId(81);
          }} style={[styles.categoryBarButton,selectedCategory===1 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===1 && styles.selectedText]}>EYE LINER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          setSelectedCategory(2);
          setId(82);
          }} style={[styles.categoryBarButton,selectedCategory===2 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===2 && styles.selectedText]}>EYE PENCIL</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          setSelectedCategory(3);
          setId(83);
          }} style={[styles.categoryBarButton,selectedCategory===3 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===3 && styles.selectedText]}>MASCARA</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          setSelectedCategory(4);
          setId(92)
          }} style={[styles.categoryBarButton,selectedCategory===4 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===4 && styles.selectedText]}>EYE SHADOW</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          setSelectedCategory(5);
          setId(94);
          }} style={[styles.categoryBarButton,selectedCategory===5 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===5 && styles.selectedText]}>EYE PRIMER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          setSelectedCategory(6);
          setId(1375);
          }} style={[styles.categoryBarButton,selectedCategory===6 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===6 && styles.selectedText]}>POMADE</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.container}>
        {faceProducts.map((product) => (
          <Product product={product} key={product.id}></Product>
        ))}
      </View>
    </ScrollView>
  );
};

export default EyesCategory;

const styles = {
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  categoryBar: {
    width: "100%",
    height: 60,
    backgroundColor: "#ef4f85",
    padding: 15,
  },
  categoryBarButton: {
    marginRight: 10,
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 20,
  },
  categoryBarText: {
    fontWeight: "bold",
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton:{
    backgroundColor:"#000",
  },
  selectedText:{
    color:"#fff",
  },

};
