import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";

const BottomBar = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const items = useSelector((state) => state.cart);
  const auth = getAuth();
  const user = auth.currentUser?.phoneNumber;
  


  useEffect(() => {
    getData();
  }, []);


  useEffect(() => {
    if (items.data) {
      setCartItems(items.data);
    }
  }, [items]);

  let quantity = 0;

  cartItems.forEach((item) => {
    quantity = quantity + item.quantity;
  });

  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("cart");
      if (storedValue !== null) {
        const parsedValue = JSON.parse(storedValue);
        items.data = parsedValue;
        setCartItems(parsedValue);
      } else {
        console.log("No data found in AsyncStorage.");
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/*............. bottomBar.................. */}
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(0);
            navigation.navigate("HOME");
          }}
        >
          <Image
            source={require("../Images/home.png")}
            style={[
              styles.bottomTabIcon,
              route.name === "HOME" && styles.activeColor,
            ]}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(1);
            navigation.navigate("Cart");
          }}
        >
          <Image
            source={require("../Images/shopping-bag.png")}
            style={[
              styles.bottomTabIcon,
              route.name === "Cart" && styles.activeColor,
            ]}
          ></Image>
          <View
            style={{
              backgroundColor: "#e7205b",
              width: 18,
              height: 20,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: 30,
              top: 14,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff" }}>{quantity}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(2);
            !user?
            navigation.navigate("User Login"):
            navigation.navigate("User Account");
          }}
        >
          <Image
            source={require("../Images/user.png")}
            style={[
              styles.bottomTabIcon,
              (route.name === "User Account"||route.name === "User Login") && styles.activeColor,
            ]}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(3);
            navigation.navigate("Shop");
          }}
        >
          <Image
            source={require("../Images/shop.png")}
            style={[
              styles.bottomTabIcon,
              route.name === "Shop" && styles.activeColor,
            ]}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  bottomTab: {
    width: "25%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTabIcon: {
    width: 24,
    height: 24,
  },
  activeColor: {
    tintColor: "#e7205b",
  },
});
