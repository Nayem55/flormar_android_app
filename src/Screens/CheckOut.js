import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CartProduct from "../Components/CartProduct";
import { Picker } from "@react-native-picker/picker";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { clearCart } from "../Redux/Slices/CartSlice";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

const CheckOut = ({ route }) => {
  const { items } = route.params;
  const [cartItems,setCartItems]=useState(items)
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [shippingInDhaka, setShippingInDhaka] = useState();
  const [shippingOutDhaka, setShippingOutDhaka] = useState();
  const [shippingCharge, setShippingCharge] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const auth = getAuth();
  const user = auth.currentUser;


  useEffect(() => {
    fetch("http://192.168.0.30:5000/shippingInDhaka")
      .then((res) => res.json())
      .then((data) => setShippingInDhaka(data));

    fetch("http://192.168.0.30:5000/shippingOutDhaka")
      .then((res) => res.json())
      .then((data) => setShippingOutDhaka(data));

    if(user){
      fetch(`http://192.168.0.30:5000/getCustomer?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
    }
  }, []);
  
  useEffect(() => {
    if (selectedDistrict === "Dhaka") {
      shippingInDhaka &&
        setShippingCharge(parseInt(shippingInDhaka?.settings.cost.value));
    } else if (selectedDistrict !== "Dhaka") {
      shippingOutDhaka &&
        setShippingCharge(parseInt(shippingOutDhaka?.settings.cost.value));
    } else {
      setShippingCharge(0);
    }
  }, [selectedDistrict]);



  let quantity = 0;
  let total = 0;

  cartItems.forEach((item) => {
    quantity = quantity + item.quantity;
    total = total + item.price * item.quantity;
  });

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
  };
  const handleChangeEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const handleChangeName = (newName) => {
    setName(newName);
  };
  const handleChangeNumber = (newNum) => {
    setNumber(newNum);
  };
  const handleChangeAddress = (newAddress) => {
    setAddress(newAddress);
  };
  const handleChangeText = (newText) => {
    setReviewText(newText);
  };
  // const clearCart = async () => {
  //   try {
  //     await AsyncStorage.removeItem("cart");
  //     console.log("Cart data cleared successfully");
  //   } catch (error) {
  //     console.log("Error clearing cart data:", error);
  //   }
  // };
  const handleSubmit = () => {
    const data = {
      payment_method: "Cash On Delivery",
      payment_method_title: "Cash On Delivery",
      set_paid: false,
      customer_id: userInfo[0]?.id || 0,
      billing: {
        first_name: name,
        last_name: "",
        address_1: address,
        address_2: "",
        city: selectedDistrict,
        state: "",
        postcode: "",
        country: "Bangladesh",
        email: email,
        phone: number,
      },
      shipping: {
        first_name: name,
        last_name: "",
        address_1: address,
        address_2: "",
        city: selectedDistrict,
        state: "",
        postcode: "",
        country: "Bangladesh",
      },
      line_items: items.map((product) => {
        return {
          product_id: product.id,
          quantity: product.quantity,
          total: JSON.stringify(product.price * product.quantity),
        };
      }),
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Flat Rate",
          total: JSON.stringify(shippingCharge),
        },
      ],
    };

    if (!name || !number || !address || !selectedDistrict) {
      Toast.show({
        type: "error",
        text1: "Please fill up the required fields",
        position: "top",
      });
    } else {
      fetch("http://192.168.0.30:5000/postOrder", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          // AsyncStorage.setItem("orderData",JSON.stringify(data))
          console.log(data);
        });
      dispatch(clearCart());
      setName("");
      setNumber("");
      setAddress("");
      setReviewText("");
      setEmail("");
      setSelectedDistrict("");
      setShippingCharge(0);
      setCartItems([]);
      Toast.show({
        type: "success",
        text1: "Order Confirmed",
        text2: "Your order has been received",
        position: "top",
      });
      navigation.navigate("Confirm")
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>BILLING DETAILS</Text>

      <View style={{ marginBottom: 40 }}>
        <View style={{ marginTop: 10 }}>
          <Text>Full Name *</Text>
          <TextInput style={styles.input} value={name} onChangeText={handleChangeName} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>Billing Mobile Number *</Text>
          <TextInput style={styles.input} value={number} onChangeText={handleChangeNumber} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>Full address *</Text>
          <TextInput style={styles.input} value={address} onChangeText={handleChangeAddress} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>District *</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              height: 40,
              justifyContent: "center",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <Picker
              selectedValue={selectedDistrict}
              onValueChange={handleDistrictChange}
            >
              <Picker.Item label="Bagerhat" value="Bagerhat" />
              <Picker.Item label="Bandarban" value="Bandarban" />
              <Picker.Item label="Barguna" value="Barguna" />
              <Picker.Item label="Barisal" value="Barisal" />
              <Picker.Item label="Bhola" value="Bhola" />
              <Picker.Item label="Bogra" value="Bogra" />
              <Picker.Item label="Brahmanbaria" value="Brahmanbaria" />
              <Picker.Item label="Chandpur" value="Chandpur" />
              <Picker.Item label="Chittagong" value="Chittagong" />
              <Picker.Item label="Chuadanga" value="Chuadanga" />
              <Picker.Item label="Comilla" value="Comilla" />
              <Picker.Item label="Cox's Bazar" value="Cox's Bazar" />
              <Picker.Item label="Dhaka" value="Dhaka" />
              <Picker.Item label="Dinajpur" value="Dinajpur" />
              <Picker.Item label="Faridpur" value="Faridpur" />
              <Picker.Item label="Feni" value="Feni" />
              <Picker.Item label="Gaibandha" value="Gaibandha" />
              <Picker.Item label="Gazipur" value="Gazipur" />
              <Picker.Item label="Gopalganj" value="Gopalganj" />
              <Picker.Item label="Habiganj" value="Habiganj" />
              <Picker.Item label="Jaipurhat" value="Jaipurhat" />
              <Picker.Item label="Jamalpur" value="Jamalpur" />
              <Picker.Item label="Jessore" value="Jessore" />
              <Picker.Item label="Jhalokati" value="Jhalokati" />
              <Picker.Item label="Jhenaidah" value="Jhenaidah" />
              <Picker.Item label="Khagrachari" value="Khagrachari" />
              <Picker.Item label="Khulna" value="Khulna" />
              <Picker.Item label="Kishoreganj" value="Kishoreganj" />
              <Picker.Item label="Kurigram" value="Kurigram" />
              <Picker.Item label="Kushtia" value="Kushtia" />
              <Picker.Item label="Lakshmipur" value="Lakshmipur" />
              <Picker.Item label="Lalmonirhat" value="Lalmonirhat" />
              <Picker.Item label="Madaripur" value="Madaripur" />
              <Picker.Item label="Magura" value="Magura" />
              <Picker.Item label="Manikganj" value="Manikganj" />
              <Picker.Item label="Maulvibazar" value="Maulvibazar" />
              <Picker.Item label="Meherpur" value="Meherpur" />
              <Picker.Item label="Munshiganj" value="Munshiganj" />
              <Picker.Item label="Mymensingh" value="Mymensingh" />
              <Picker.Item label="Naogaon" value="Naogaon" />
              <Picker.Item label="Narail" value="Narail" />
              <Picker.Item label="Narayanganj" value="Narayanganj" />
              <Picker.Item label="Narsingdi" value="Narsingdi" />
              <Picker.Item label="Natore" value="Natore" />
              <Picker.Item label="Nawabganj" value="Nawabganj" />
              <Picker.Item label="Netrokona" value="Netrokona" />
              <Picker.Item label="Nilphamari" value="Nilphamari" />
              <Picker.Item label="Noakhali" value="Noakhali" />
              <Picker.Item label="Pabna" value="Pabna" />
              <Picker.Item label="Panchagarh" value="Panchagarh" />
              <Picker.Item label="Patuakhali" value="Patuakhali" />
              <Picker.Item label="Pirojpur" value="Pirojpur" />
              <Picker.Item label="Rajbari" value="Rajbari" />
              <Picker.Item label="Rajshahi" value="Rajshahi" />
              <Picker.Item label="Rangamati" value="Rangamati" />
              <Picker.Item label="Rangpur" value="Rangpur" />
              <Picker.Item label="Satkhira" value="Satkhira" />
              <Picker.Item label="Shariatpur" value="Shariatpur" />
              <Picker.Item label="Sherpur" value="Sherpur" />
              <Picker.Item label="Sirajganj" value="Sirajganj" />
              <Picker.Item label="Sunamganj" value="Sunamganj" />
              <Picker.Item label="Sylhet" value="Sylhet" />
              <Picker.Item label="Tangail" value="Tangail" />
              <Picker.Item label="Thakurgaon" value="Thakurgaon" />
            </Picker>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>Billing Email (optional)</Text>
          <TextInput style={styles.input} value={email} onChangeText={handleChangeEmail} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>Order notes (optional)</Text>
          <TextInput
            style={styles.textArea}
            value={reviewText}
            multiline={true}
            numberOfLines={4} // You can adjust the number of lines displayed
            onChangeText={handleChangeText}
          />
        </View>
      </View>
      <View style={{ backgroundColor: "#fceef2", padding: 10, paddingTop: 40 }}>
        <Text style={{ fontSize: 24, marginBottom: 40, textAlign: "center" }}>
          YOUR ORDER
        </Text>
        <View style={{ backgroundColor: "#fff", marginBottom: 20 }}>
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
              data={cartItems}
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
                      {item.name} x{item.quantity}
                    </Text>
                    <Text style={{ width: "30%", textAlign: "right" }}>
                      TK. {item.price * item.quantity}
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
            <Text>TK. {total}</Text>
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
              {selectedDistrict === "Dhaka"
                ? shippingInDhaka?.title
                : shippingOutDhaka?.title}{" "}
              TK. {shippingCharge}
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
            <Text>TK. {total + shippingCharge}</Text>
          </View>
        </View>
        <View style={{ marginBottom: 40 }}>
          <Text>Cash On Delivery</Text>
          <Text style={{ backgroundColor: "#fff", padding: 10, marginTop: 10 }}>
            Pay With Cash Upon Delivery
          </Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              borderStyle: "dotted",
              marginTop: 30,
              marginBottom: 20,
              opacity: 0.2,
            }}
          ></View>
          <Text>
            <Text style={{ color: "#a3a3a3" }}>
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our
            </Text>{" "}
            privacy policy.
          </Text>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: "#e7205b",
              padding: 10,
              alignItems: "center",
              marginTop: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff" }}>PLACE ORDER</Text>
          </TouchableOpacity>
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
