import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AppNavigator from "./src/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
 

export default function App() {

  return (
    <GestureHandlerRootView style={styles.container}>
      <AppNavigator></AppNavigator>
    </GestureHandlerRootView>
  );
}
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
