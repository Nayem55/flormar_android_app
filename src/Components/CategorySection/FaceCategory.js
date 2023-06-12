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

const { height, width } = Dimensions.get("window");

const FaceCategory = () => {
  const [faceProducts, setFaceProducts] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState(0)
  const [id,setId] = useState(70)
  const navigation = useNavigation();
  useEffect(() => {
    setFaceProducts([])
    setId(0)
    if(selectedCategory===1){
      setId(77)
    }
    if(selectedCategory===2){
      setId(74)
    }
    if(selectedCategory===3){
      setId(76)
    }
    if(selectedCategory===4){
      setId(75)
    }
    if(selectedCategory===5){
      setId(79)
    }
    if(selectedCategory===6){
      setId(78)
    }
    if(selectedCategory===7){
      setId(1452)
    }
    if(selectedCategory===8){
      setId(91)
    }
    if(selectedCategory===9){
      setId(97)
    }
    if(selectedCategory===10){
      setId(98)
    }
    if(selectedCategory===11){
      setId(99)
    }
    fetch(`http://192.168.1.128:5000/getProductsByCategories?id=${id}`)
      .then((res) => res.json())
      .then((data) => setFaceProducts(data));
  }, [id,selectedCategory]);


  return (
    <ScrollView style={{ backgroundColor: "#fceef2" }} horizontal={false}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.categoryBar}
      >
        <TouchableOpacity onPress={()=>setSelectedCategory(1)} style={[styles.categoryBarButton,selectedCategory===1 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===1 && styles.selectedText]}>FOUNDATION</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory(2)} style={[styles.categoryBarButton,selectedCategory===2 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===2 && styles.selectedText]}>BLUSH ON</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory(3)} style={[styles.categoryBarButton,selectedCategory===3 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===3 && styles.selectedText]}>FACE POWDER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory(4)} style={[styles.categoryBarButton,selectedCategory===4 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===4 && styles.selectedText]}>CONCEALER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory(5)} style={[styles.categoryBarButton,selectedCategory===5 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===5 && styles.selectedText]}>PRIMER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory(6)} style={[styles.categoryBarButton,selectedCategory===6 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===6 && styles.selectedText]}>CONTOUR/HIGHLIGHTER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory(7)} style={[styles.categoryBarButton,selectedCategory===7 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===7 && styles.selectedText]}>GEL/CREAM</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory(8)} style={[styles.categoryBarButton,selectedCategory===8 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===8 && styles.selectedText]}>FIXER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory(9)} style={[styles.categoryBarButton,selectedCategory===9 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===9 && styles.selectedText]}>MASK</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory(10)} style={[styles.categoryBarButton,selectedCategory===10 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===10 && styles.selectedText]}>TONIC</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory(11)} style={[styles.categoryBarButton,selectedCategory===11 && styles.selectedButton]}>
          <Text style={[styles.categoryBarText,selectedCategory===11 && styles.selectedText]}>CLEANER/REMOVER</Text>
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

export default FaceCategory;

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
