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
  
const SummerTrends = () => {
    const [summerTrends, setSummerTrends] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
      fetch(`http://192.168.0.30:5000/getSummerProducts?page=1`)
        .then((res) => res.json())
        .then((data) => setSummerTrends(data[0]));
        summerTrends.length>0 && setLoading(false);
    }, [summerTrends.length]);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Summer Trends</Text>
        <View style={styles.underline} />
        <TouchableOpacity onPress={() => navigation.navigate("Summer Makeup")}>
          <Text style={{ marginTop: 20 }}>View All Products</Text>
        </TouchableOpacity>
        <View><Image style={{width: "100%",height: 400,marginTop:25}} source={{uri:"https://flormarbd.com/wp-content/uploads/2023/04/Winter-MakeUp-Trends-image.jpg"}}></Image></View>
        {loading && (
          <ActivityIndicator
            style={[loading ? styles.show : styles.hide]}
            size={"large"}
            color="#ef4f85"
          ></ActivityIndicator>
        )}
  
        <View style={{ flex: 1 }}>
          <ScrollView horizontal={true}>
            {summerTrends.map((product) => (
              <Product product={product} key={product?.id}></Product>
            ))}
          </ScrollView>
        </View>
      </View>
    );
}

export default SummerTrends;

const styles = {
    container: {
      width: "100%",
      height: 1000,
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
      width: 180,
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
  