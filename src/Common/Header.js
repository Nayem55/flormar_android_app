import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { color } from "react-native-reanimated";
const { height, width } = Dimensions.get("window");
const Header = ({
  leftIcon,
  rightIcon,
  onClickLeftIcon,
  onClickRightIcon
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onClickLeftIcon();
        }}
      >
        <Image source={leftIcon} style={styles.icon}></Image>
      </TouchableOpacity>
      <Image
        style={styles.logo}
        source={require("../Images/Flormar-Logo-Png-1-768x206.png")}
      ></Image>
      <TouchableOpacity onPress={()=>{
        onClickRightIcon()
      }} style={styles.btn}>
        <Image source={rightIcon} style={styles.icon}></Image>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 95,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 45,
    paddingBottom: 20,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  logo: {
    width: 140,
    height: 40,
  },
});
