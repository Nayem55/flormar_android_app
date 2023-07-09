import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Header from "../Common/Header";
import Home from "./Tabs/Home";
import Cart from "./Tabs/Cart";
import Profile from "./Tabs/Login";
import WIshList from "./Tabs/WIshList";
import BottomBar from "../Components/BottomBar";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/*............... header............... */}
      <Header
        leftIcon={require("../Images/menu.png")}
        rightIcon={require("../Images/search.png")}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      ></Header>

      {/*..............screen content.............. */}
      <Home></Home>

      {/*............. bottomBar.................. */}
      <BottomBar></BottomBar>
    </View>
  );
};

export default HomeScreen;

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
