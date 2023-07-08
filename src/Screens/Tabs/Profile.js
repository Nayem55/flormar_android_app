import React from "react";
import BottomBar from "../../Components/BottomBar";
import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigation } from "@react-navigation/native";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRef } from "react";
import auth from "../../firebase.config";

const Profile = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const recaptchaRef = useRef();
  const confirmationResultRef = useRef(null);
  


  function onCaptchVerify() {
    if (!recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier(
        recaptchaRef.current,
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = recaptchaRef.current;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
    .then((confirmationResult) => {
      console.log("Confirmation result:", confirmationResult);
      confirmationResultRef.current = confirmationResult;
      setLoading(false);
      setShowOTP(true);
      console.log("OTP sent");
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }

  function onOTPVerify() {
    setLoading(true);
    const confirmationResult = confirmationResultRef.current;

    if (!confirmationResult) {
      console.log("No confirmation result available");
      setLoading(false);
      return;
    } 
    confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [errorText, setErrorText] = useState('');
  // const [
  //   createUserWithEmailAndPassword,
  //   user,
  //   loading,
  //   error,
  // ] = useCreateUserWithEmailAndPassword(auth);

  // const navigation = useNavigation();

  // if (error) {
  //     setErrorText(error.message)
  // }

  // if (user) {
  //     navigation.navigate("User Account")
  // }

  // const handleLogin = () => {
  //   console.log('Logging in...');
  // };

  // const handleSignup = () => {
  //   createUserWithEmailAndPassword(email, password)
  // };

  return (
    <View style={styles.container}>
    {/* <View ref={(ref) => (window.recaptchaVerifier = ref)} /> */}
    <View ref={recaptchaRef} />
      {showOTP ? (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            onChangeText={(text) => setOtp(text)}
            value={otp}
          />
          <Button title="Verify OTP" onPress={onOTPVerify} />
        </View>
      ) : (
        <View>
        <TextInput
            style={styles.input}
            placeholder="Verify your phone number"
            onChangeText={(text) => setPh(text)}
            value={ph}
          />
          <Button title="Send code via SMS" onPress={onSignup} />

        </View>
      )}
      {/* <TextInput
      style={styles.input}
      placeholder="Email"
      onChangeText={text => setEmail(text)}
      value={email}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      secureTextEntry
      onChangeText={text => setPassword(text)}
      value={password}
    />
   <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row",gap:10}}>
   <Button title="Login" onPress={handleLogin} />
    <Button title="Signup" onPress={handleSignup} />
   </View> */}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
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
