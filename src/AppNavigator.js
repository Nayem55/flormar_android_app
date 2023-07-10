import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./Screens/Main";
import productDetails from "./Screens/ProductDetails";
import Cart from "./Screens/Tabs/Cart";
import CheckOut from "./Screens/CheckOut";
import ConfirmationScreen from "./Screens/ConfirmationScreen";
import Login from "./Screens/Tabs/Login";
import Profile from "./Screens/Profile";
import Shop from "./Screens/Tabs/Shop";
import FavProducts from "./Screens/MostFavorites";
import SummerMakeup from "./Screens/SummerMakeupPage";
import NudeMakeupPage from "./Screens/NudeMakeupPage";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Most Favorites"
          component={FavProducts}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Summer Makeup"
          component={SummerMakeup}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Nude Makeup"
          component={NudeMakeupPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Product Details"
          component={productDetails}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="User Login"
          component={Login}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Shop"
          component={Shop}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Check Out"
          component={CheckOut}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="User Account"
          component={Profile}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
