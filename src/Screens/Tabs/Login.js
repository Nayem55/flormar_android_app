import React from "react";
import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../firebase.config";
import firebase from "firebase/compat/app";
import { useRef } from "react";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import BottomBar from "../../Components/BottomBar";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [showOTP, setShowOTP] = useState(false);
  const recaptchaVerifier = useRef(null);
  const auth = getAuth();
  const user = auth.currentUser?.phoneNumber;
  const navigation = useNavigation();
  console.log(user)
  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(ph, recaptchaVerifier.current)
      .then(setVerificationId)
      .then(() => {
        setPh("");
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

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      otp
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setOtp("");
        Toast.show({
          type: "success",
          text1: "LOGIN SUCCESSFUL",
          position: "top",
        });
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

      <BottomBar></BottomBar>
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
