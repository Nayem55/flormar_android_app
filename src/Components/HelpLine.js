import { View, Text, Image } from "react-native";
import React from "react";

const HelpLine = () => {
  return (
    <View style={{width:"100%",height:600}}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View style={{width:"50%",alignItems:"center"}}>
          <Image
            style={{ width: "40%", height: 75, marginTop: 35 }}
            source={{
              uri: "https://flormarbd.com/wp-content/uploads/elementor/thumbs/delivery-truck-q2799n3iypgh9l68ln7z8ejstamgh49cdexz6jvl0g.png",
            }}
          ></Image>
          <Text style={{ fontSize: 24,textAlign:"center" }}>Fast & Free Delivery</Text>
          <Text style={{ opacity: 0.5,textAlign:"center",marginTop:10 }}>
            Get Free Delivery for Tk. 1000+ within 2-3 Business Days
          </Text>
        </View>

        <View style={{width:"40%",alignItems:"center"}}>
          <Image
            style={{ width: "50%", height: 75, marginTop: 35 }}
            source={{
              uri: "https://flormarbd.com/wp-content/uploads/elementor/thumbs/delivery-status-q2799n3iypgh9l68ln7z8ejstamgh49cdexz6jvl0g.png",
            }}
          ></Image>
          <Text style={{fontSize: 24,textAlign:"center" }}>Easy Return Policy</Text>
          <Text style={{ opacity: 0.5 ,marginTop:10,textAlign:"center"}}>
            Easily Return your order within 15 Business days
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly",marginTop:20 }}>
        <View style={{width:"50%",alignItems:"center"}}>
          <Image
            style={{ width: "40%", height: 75, marginTop: 35 }}
            source={{
              uri: "https://flormarbd.com/wp-content/uploads/elementor/thumbs/payment-security-q2799o1d5jhrl74vg5mlswb9eohtotd2pjlgntu6u8.png",
            }}
          ></Image>
          <Text style={{ fontSize: 24,textAlign:"center" ,marginTop:20 }}>Secure Online Payment</Text>
          <Text style={{ opacity: 0.5,textAlign:"center",marginTop:10 }}>
            Pay securely in Flormar with Online & Mobile Payments
          </Text>
        </View>

        <View style={{width:"40%",alignItems:"center"}}>
          <Image
            style={{ width: "50%", height: 80, marginTop: 35 }}
            source={{
              uri: "https://flormarbd.com/wp-content/uploads/elementor/thumbs/helpline-q2799o1d5jhrl74vg5mlswb9eohtotd2pjlgntu6u8.png",
            }}
          ></Image>
          <Text style={{ fontSize: 24,textAlign:"center",marginTop:20 }}>Customer Helpline</Text>
          <Text style={{ fontSize:18,color:"#ef4f85",textAlign:"center",marginTop:10 }}>
          +88 01969 906 700
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HelpLine;
