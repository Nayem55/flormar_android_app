import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AppNavigator from "./src/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Provider } from "react-redux";
import {store} from "./src/Redux/Store";
import Toast from 'react-native-toast-message';


export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <AppNavigator></AppNavigator>
        <Toast/>
      </Provider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
