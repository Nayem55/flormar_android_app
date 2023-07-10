import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import Product from "./Product";
  import { useNavigation } from "@react-navigation/native";

const NudeMakeUp = () => {
    const [nudeMakeUpCollection, setNudeMakeUpCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
      fetch(`http://192.168.0.30:5000/getNudeMakeUpProducts?page=1`)
        .then((res) => res.json())
        .then((data) => setNudeMakeUpCollection(data[0]));
        nudeMakeUpCollection.length>0 && setLoading(false);
    }, [nudeMakeUpCollection.length]);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nude MakeUp Collection</Text>
        <View style={styles.underline} />
        <TouchableOpacity onPress={() => navigation.navigate("Nude Makeup")}>
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
            {nudeMakeUpCollection.map((product) => (
              <Product product={product} key={product?.id}></Product>
            ))}
          </ScrollView>
        </View>
        <View><Image style={{width: "100%",height: 400,}} source={{uri:"https://flormarbd.com/wp-content/uploads/2023/02/website-Slider-Lips.png"}}></Image></View>
      </View>
    );
}


export default NudeMakeUp;

const styles = {
    container: {
      width: "100%",
      height: 1000,
      backgroundColor: "#fceef2",
      padding: 20,
      paddingTop: 40,
    },
    title: {
      fontSize: 25,
      color: "#ef4f85",
      fontFamily: "monospace",
    },
    underline: {
      width: 200,
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