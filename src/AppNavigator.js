import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Main from "./Screens/Main";
import ProductScreen from "./Screens/ProductScreen";
import productDetails from "./Screens/ProductDetails";
import Cart from "./Screens/Tabs/Cart";
import Profile from "./Screens/Tabs/Profile";
import WIshList from "./Screens/Tabs/WIshList";
import { useState } from "react";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="main" component={Main} options={{headerShown: false}}/>
        <Stack.Screen name="Products" component={ProductScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Product Details" component={productDetails} options={{headerShown: true}}/>
        <Stack.Screen name="Cart" component={Cart} options={{headerShown: true}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: true}}/>
        <Stack.Screen name="Wishlist" component={WIshList} options={{headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
