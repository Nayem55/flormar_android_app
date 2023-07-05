import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import CartProduct from "../Components/CartProduct";

const CheckOut = ({ route }) => {
  const { items } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>BILLING DETAILS</Text>

      <View style={{ marginBottom: 40 }}>
        <View style={{ marginTop: 10 }}>
          <Text>Full Name *</Text>
          <TextInput
            style={styles.input}
            //   onChangeText={handleChangeName}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>Billing Mobile Number *</Text>
          <TextInput
            style={styles.input}
            //   onChangeText={handleChangeName}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>Full address *</Text>
          <TextInput
            style={styles.input}
            //   onChangeText={handleChangeName}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>District *</Text>
          <TextInput
            style={styles.input}
            //   onChangeText={handleChangeName}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>Billing Email (optional)</Text>
          <TextInput
            style={styles.input}
            //   onChangeText={handleChangeName}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>Order notes (optional)</Text>
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={4} // You can adjust the number of lines displayed
            //   onChangeText={handleChangeText}
          />
        </View>
      </View>
      <View style={{ backgroundColor: "#fceef2", padding: 10, paddingTop: 40 }}>
        <Text style={{ fontSize: 24, marginBottom: 40, textAlign: "center" }}>
          YOUR ORDER
        </Text>
        <View style={{ backgroundColor: "#fff", marginBottom: 60 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Text>PRODUCT</Text>
            <Text>SUBTOTAL</Text>
          </View>
          {
            <FlatList
              data={items}
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
                  <View style={{flexDirection:"row",justifyContent:"space-between",padding:10}}>
                    <Text style={{width:"70%"}}>{item.name} x{item.quantity}</Text>
                    <Text style={{width:"30%",textAlign:"right"}}>TK {item.price*item.quantity}</Text>
                  </View>
                </View>
              )}
              onEndReachedThreshold={0.8}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          }
        </View>
      </View>
    </ScrollView>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 12,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    padding: 12,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
