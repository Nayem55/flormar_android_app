import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useNavigation } from "@react-navigation/native";

const Favorite = () => {
  const [favProducts, setFavProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    fetch(`http://192.168.0.28:5000/getFavoriteProducts`)
      .then((res) => res.json())
      .then((data) => setFavProducts(data));
      favProducts.length>0 && setLoading(false);
  }, [favProducts.length]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Most Favorites</Text>
      <View style={styles.underline} />
      <TouchableOpacity onPress={() => navigation.navigate("Products")}>
        <Text style={{ marginTop: 20 }}>View All Products</Text>
      </TouchableOpacity>
      {loading && (
        <ActivityIndicator
          style={[loading ? styles.show : styles.hide]}
          size={"large"}
          color="#ef4f85"
        ></ActivityIndicator>
      )}

      <View style={{ flex: 1 }}>
        <ScrollView horizontal={true}>
          {favProducts.map((product) => (
            <Product product={product} key={product?.id}></Product>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Favorite;

const styles = {
  container: {
    width: "100%",
    height: 700,
    backgroundColor: "#fceef2",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 25,
    color: "#ef4f85",
    fontFamily: "monospace",
  },
  underline: {
    width: 100,
    height: 3,
    top: 10,
    backgroundColor: "#ef4f85",
  },
  show: {
    marginTop: 80,
  },
  hide: {
    marginTop: 0,
    display: "none",
  },
};
