import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "../Components/BottomBar";

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser?.phoneNumber;
  const navigation = useNavigation();

  console.log(auth.currentUser)

  const LogOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User logged out successfully");
        navigation.navigate("User Login")
        // Perform any additional actions after the user is logged out
      })
      .catch((error) => {
        console.log("An error occurred while logging out:", error);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text>User Phone : {user}</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#e7205b",
              padding: 10,
              alignItems: "center",
            }}
            onPress={LogOut}
          >
            <Text style={{ color: "#fff" }}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomBar></BottomBar>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    backgroundColor: "#fff",
    height: "100%",
  },
});
