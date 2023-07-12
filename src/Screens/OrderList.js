import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import BottomBar from "../Components/BottomBar";
  import { format, parseISO } from "date-fns";

  const OrderList = ({route}) => {
    const order = route.params.item;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1, backgroundColor: "#fff",paddingHorizontal: 26, }}>
        <Text style={{marginTop:20}}>Order Details For Order #{order?.id}</Text>
        <View style={{ backgroundColor: "#fff", marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              marginTop:20
            }}
          >
            <Text>PRODUCT</Text>
            <Text>SUBTOTAL</Text>
          </View>
          {
            <FlatList
              data={order?.line_items}
              renderItem={({ item, index }) => (
                <View>
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: 1,
                      borderStyle: "dotted",
                      marginTop: 6,
                      opacity: 0.2,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                    }}
                  >
                    <Text style={{ width: "70%" }}>
                      {item?.name} x{item?.quantity}
                    </Text>
                    <Text style={{ width: "30%", textAlign: "right" }}>
                      TK. {item?.subtotal}
                    </Text>
                  </View>
                </View>
              )}
              onEndReachedThreshold={0.8}
            />
          }
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              borderStyle: "dotted",
              marginTop: 6,
              opacity: 0.2,
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Text>SUBTOTAL</Text>
            <Text>TK. {parseInt(order?.total) - parseInt(order?.shipping_lines[0].total)}</Text>
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              borderStyle: "dotted",
              marginTop: 6,
              opacity: 0.2,
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Text>SHIPPING</Text>
            <Text>
              TK. {order?.shipping_lines[0].total} 
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              borderStyle: "dotted",
              marginTop: 6,
              opacity: 0.2,
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Text>PAYMENT METHOD</Text>
            <Text>
              CASH ON DELIVERY
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              borderStyle: "dotted",
              marginTop: 6,
              opacity: 0.2,
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Text>TOTAL</Text>
            <Text>TK. {order.total}</Text>
          </View>
          </View>
        </View>
        <BottomBar></BottomBar>
      </View>
    );
  };
  
  export default OrderList;
  
  const styles = StyleSheet.create({

  });
  