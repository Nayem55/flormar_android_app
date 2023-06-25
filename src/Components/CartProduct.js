import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart, deleteItemFromCart, reduceItemQuantity } from "../Redux/Slices/CartSlice";
const { height, width } = Dimensions.get("window");

const CartProduct = ({ product,index }) => {
  const [value, setValue] = useState(product.quantity);
  const dispatch = useDispatch();

  const handleMinus = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handlePlus = () => {
    setValue(value + 1);
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.productImage}>
          <Image
            style={styles.image}
            source={{ uri: product?.images[0]?.src }}
          ></Image>
        </View>
        <View style={styles.details}>
          <Text style={{width:"60%"}}>{product?.name}</Text>
          <View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Text>PRICE :</Text>
              <Text style={styles.price}>
                TK.{" "}
                {product?.on_sale
                  ? product?.sale_price
                  : product?.regular_price}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10, position:"relative" }}
            >
              <View style={styles.quantity}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={()=>{
                    dispatch(reduceItemQuantity(product))
                    handleMinus()
                  }}
                >
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  value={value.toString()}
                  onChangeText={(text) => setValue(parseInt(text))}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={()=>{
                    dispatch(addItemToCart(product))
                    handlePlus()
                  }}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={()=>{
                dispatch(deleteItemFromCart(index))
              }} style={{position:"absolute", top:5,left:200,width:40,height:40,borderRadius:20,backgroundColor:"#dedede",justifyContent:"center",alignItems:"center"}}>
                <Image style={{width:18,height:18}} source={require('../Images/bin.png')}></Image>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginTop: 10,
              }}
            >
              <Text>SUBTOTAL :</Text>
              <Text style={styles.price}>
                TK.{" "}
                {product?.on_sale
                  ? product?.sale_price * value
                  : product?.regular_price * value}
              </Text>
            </View>
          </View>
        </View>
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
    </View>
  );
};

export default CartProduct;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    height: 100,
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  productImage: {
    backgroundColor: "#fff",
    width: "30%",
    height: 100,
    marginTop: 20,
    padding: 20,
    justifyContent: "center",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 150,
  },
  details: {
    marginTop: 10,
    width: "100%",
  },
  price: {
    color: "#ef4f85",
    fontSize: 14,
  },
  button: {
    width: 160,
    padding: 8,
    backgroundColor: "#ef4f85",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
    marginTop: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: "#DDDDDD",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
