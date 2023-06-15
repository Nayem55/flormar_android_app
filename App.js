import { StatusBar } from "expo-status-bar";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    // <GestureHandlerRootView>
      <AppNavigator></AppNavigator>
    // </GestureHandlerRootView>
  );

}
