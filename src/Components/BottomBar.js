import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";

const BottomBar = () => {
    const [selectedTab,setSelectedTab] = useState(0)
    const navigation = useNavigation()
    const route = useRoute();
    const cartItems = useSelector(state=>state.cart);

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
          <View style={{backgroundColor:"#e7205b",width:18,height:20,justifyContent:"center",alignItems:"center",position:"absolute",right:30,top:14,borderRadius:10}}>
            <Text style={{color:"#fff"}}>{cartItems.data.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(2);
            navigation.navigate("Profile");
          }}
        >
          <Image
            source={require("../Images/user.png")}
            style={[
              styles.bottomTabIcon,
              route.name === "Profile" && styles.activeColor,
            ]}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(3);
            navigation.navigate("Wishlist");
          }}
        >
          <Image
            source={require("../Images/heart.png")}
            style={[
              styles.bottomTabIcon,
              route.name === "Wishlist" && styles.activeColor,
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
    bottomTab:{
      width:"25%",
      height:"100%",
      justifyContent:"center",
      alignItems:"center",
    },
    bottomTabIcon:{
      width:24,
      height:24,
    },
    activeColor:{
      tintColor:"#e7205b"
    }
  });