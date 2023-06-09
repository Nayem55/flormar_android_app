import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Header from "../Common/Header";
import Home from "./Tabs/Home";
import Cart from "./Tabs/Cart";
import Profile from "./Tabs/Profile";
import WIshList from "./Tabs/WIshList";

const HomeScreen = ({navigation}) => {
    const [selectedTab,setSelectedTab] = useState(0)
  return (
    <View style={styles.container}>
    {/*............... header............... */}
      <Header
        leftIcon={require("../Images/menu.png")}
        rightIcon={require("../Images/search.png")}
        onClickLeftIcon={()=>{
            navigation.openDrawer();
        }}
      ></Header>

    {/*..............screen content.............. */}
        {
            selectedTab==0?<Home></Home>:selectedTab==1?<Cart></Cart>:selectedTab==2?<Profile></Profile>:<WIshList></WIshList>
        }

    {/*............. bottomBar.................. */}
      <View style={styles.bottomView}>
            <TouchableOpacity style={styles.bottomTab} onPress={()=>setSelectedTab(0)}>
                <Image source={require('../Images/home.png')} style={[styles.bottomTabIcon,selectedTab===0 && styles.activeColor]}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomTab} onPress={()=>setSelectedTab(1)}>
                <Image source={require('../Images/shopping-bag.png')} style={[styles.bottomTabIcon,selectedTab===1 && styles.activeColor]}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomTab} onPress={()=>setSelectedTab(2)}>
                <Image source={require('../Images/user.png')} style={[styles.bottomTabIcon,selectedTab===2 && styles.activeColor]}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomTab} onPress={()=>setSelectedTab(3)}>
                <Image source={require('../Images/heart.png')} style={[styles.bottomTabIcon,selectedTab===3 && styles.activeColor]}></Image>
            </TouchableOpacity>
      </View>
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
