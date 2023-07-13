import React, { useEffect } from "react";
import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../firebase.config";
import firebase from "firebase/compat/app";
import { useRef } from "react";
import { getAuth,updateEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import BottomBar from "../../Components/BottomBar";
const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [email, setEmail] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [showOTP, setShowOTP] = useState(false);
  const [userData,setUserData] = useState({})
  const recaptchaVerifier = useRef(null);
  const auth = getAuth();
  const user = auth.currentUser?.phoneNumber;
  const navigation = useNavigation();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    if (user) {
      // saveUser(userData);
      navigation.navigate("User Account")
    }
  }, [user]);
  console.log(auth,"user")
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  
  const sendVerification = async() => {
    const phoneNumber = "+88"+ph
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    await phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId)
      .then(() => {
        setShowOTP(true);
        Toast.show({
          type: "success",
          text1: "OTP SENT TO YOUR NUMBER",
          position: "top",
        });
      })
      .catch((error) => {
        console.log("OTP sending error:", error);
        Toast.show({
          type: "error",
          text1: "SOMETHING WENT WRONG",
          text2: "PLEASE TRY AGAIN",
          position: "top",
        });
      });
  };

  const confirmCode = async() => {
    const phoneNumber = "+88"+ph;
    const data = {
      email: email,
      password: "",
      first_name: "",
      last_name: "",
      username: "",
      billing: {
        first_name: "",
        last_name: "",
        company: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "Bangladesh",
        email: email,
        phone: ph,
      },
      shipping: {
        first_name: "",
        last_name: "",
        company: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "Bangladesh",
      },
      meta_data: [
        {
          id: 3237,
          key: "digt_countrycode",
          value: "+88",
        },
        {
          id: 3238,
          key: "digits_phone_no",
          value: ph,
        },
        {
          id: 3239,
          key: "digits_phone",
          value: phoneNumber,
        },
      ],
    };
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      otp
    );
   await firebase.auth().signInWithCredential(credential)
      .then(() => {
        setOtp("");
        Toast.show({
          type: "success",
          text1: "LOGIN SUCCESSFUL",
          position: "top",
        });
        updateEmail(auth.currentUser, email).then(() => {
          // Email updated!
          console.log("email addded")
          // ...
        }).catch((error) => {
          // An error occurred
          console.log("Couldn't add email",error)
          // ...
        });
        saveUser(data);
        navigation.navigate("main");
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "SOMETHING WENT WRONG",
          text2: "PLEASE TRY AGAIN",
          position: "top",
        });
      });
      
  };
  
  const saveUser =(userData)=>{
    const data = userData;
    fetch('http://192.168.0.30:5000/postCustomer',{
      method: 'post',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
    })
  }
  
  const LogOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User logged out successfully");
        navigation.navigate("User Login");
        // Perform any additional actions after the user is logged out
      })
      .catch((error) => {
        console.log("An error occurred while logging out:", error);
      });
  };

  // if(user){
  //   return <View style={{ flex: 1, backgroundColor: "#fff",justifyContent:"center",alignItems:"center" }}>
  //      <TouchableOpacity
  //           style={{
  //             backgroundColor: "#e7205b",
  //             padding: 10,
  //             alignItems: "center",
  //           }}
  //           onPress={LogOut}
  //         >
  //           <Text style={{ color: "#fff" }}>LOG OUT</Text>
  //         </TouchableOpacity>
  //   </View>
  // }else

  
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <Text style={{ fontSize: 28, marginBottom: 50, color: "#e7205b" }}>
          Customer Login
        </Text>
        {showOTP ? (
          <View style={{ width: "100%" }}>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="phone-pad"
              onChangeText={(text) => setOtp(text)}
              value={otp}
            />
            <Text style={{ marginBottom: 10,color: "#a3a3a3" }}>
              An OTP has sent to your mobile number . Please enter the OTP to
              confirm your login
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#e7205b",
                padding: 10,
                alignItems: "center",
              }}
              onPress={confirmCode}
            >
              <Text style={{ color: "#fff" }}>Login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ width: "100%" }}>
          <Text style={{marginBottom:10}}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              onChangeText={setEmail}
              value={email.toLocaleLowerCase()}
            />
          <Text style={{marginBottom:10}}>Phone number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              autoCompleteType="tel"
              onChangeText={setPh}
              value={ph}
            />
            <Text style={{ marginBottom: 10 }}>
              <Text style={{ color: "#a3a3a3" }}>
                Your personal data will be used to support your experience
                throughout this app, to manage access to your account, and for
                other purposes described in our{" "}
              </Text>
              privacy policy.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#e7205b",
                padding: 10,
                alignItems: "center",
              }}
              onPress={sendVerification}
            >
              <Text style={{ color: "#fff" }}>Send code via SMS</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {isKeyboardOpen?"":<BottomBar></BottomBar>}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 26,
    backgroundColor: "#fff",
    height: "100%",
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderColor: "gray",
    borderWidth: 1,
  },
});