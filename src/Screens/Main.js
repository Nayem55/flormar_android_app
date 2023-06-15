import { View, Text, Image } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import EyesCategory from "../Components/CategorySection/EyesCategory";
import LipsCategory from "../Components/CategorySection/LipsCategory";
import NailsCategory from "../Components/CategorySection/NailsCategory";
import Accessories from "../Components/CategorySection/Accessories";
import FaceCategory from "../Components/CategorySection/FaceCategory";


const Drawer = createDrawerNavigator();
const Main = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HOME"
        component={HomeScreen}
        options={{ headerShown: false }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="FACE"
        component={FaceCategory}
        options={{ headerShown: true }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="EYES"
        component={EyesCategory}
        options={{ headerShown: true }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="LIPS"
        component={LipsCategory}
        options={{ headerShown: true }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="NAILS"
        component={NailsCategory}
        options={{ headerShown: true }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="ACCESSORIES"
        component={Accessories}
        options={{ headerShown: true }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default Main;
