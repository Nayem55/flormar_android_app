import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const Resellers = () => {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        We Care About Your Demands
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: "75%", height: 100, marginTop: 25 }}
            source={{
              uri: "https://flormarbd.com/wp-content/uploads/elementor/thumbs/reseller-q4h7mdbnlptq0hi337e9abqm0kv24sa7v64s6l8has.png",
            }}
          ></Image>
          <Text style={{ marginTop: 20 }}>AUTHORIZED RESELLERS</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: "100%", height: 100, marginTop: 25 }}
            source={{
              uri: "https://flormarbd.com/wp-content/uploads/elementor/thumbs/business-partnership-business-partner-logo-organization-corporation-company-limited-liability-partnership-png-clipart-removebg-preview-q4h80c7bj8kzzlxbet5rmewq3jfhzsi7mhzbkr0ixo.png",
            }}
          ></Image>
          <Text style={{ marginTop: 20 }}>ONLINE PARTNERS</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          borderStyle: "dotted",
          marginTop: 30,
          opacity: 0.2,
        }}
      ></View>
      <Text style={{ textAlign: "center", fontSize: 20, marginTop: 40 }}>
        COMPANY CERTIFICATION
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Image
            style={{ width: "30%", height: 90, marginTop: 25 }}
            source={{
              uri: "https://flormarbd.com/wp-content/uploads/elementor/thumbs/halal-q538vq4tvcxrs46p67mnfoka0u4z97rchaop1w636c.png",
            }}
          ></Image>

          <Image
            style={{ width: "28%", height: 70, marginTop: 35 }}
            source={{
              uri: "https://flormarbd.com/wp-content/uploads/elementor/thumbs/bsti-q538vmdgv91509mwvrajr079azcpq0id1p8h6yxz72.png",
            }}
          ></Image>

          <Image
            style={{ width: "28%", height: 75, marginTop: 35 }}
            source={{
              uri: "https://flormarbd.com/wp-content/uploads/elementor/thumbs/ISO-q538vo95houyjiz898kkbb6r2ng2w5bl469u1hwl4g.png",
            }}
          ></Image>
      </View>
    </View>
  );
};

export default Resellers;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 500,
    padding: 20,
    backgroundColor: "#FFF",
  },
});
