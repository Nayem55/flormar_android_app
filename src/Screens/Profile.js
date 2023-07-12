import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "../Components/BottomBar";
import { format, parseISO } from "date-fns";

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser?.phoneNumber;
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const [orderList, setOrderList] = useState([]);

  // 
  useEffect(() => {
    fetch(`http://192.168.0.30:5000/getCustomer?email=${auth.currentUser?.email}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));

    fetch(`http://192.168.0.30:5000/getOrder?id=${userInfo[0]?.id}`)
      .then((res) => res.json())
      .then((data) => setOrderList(data));
      
  }, [auth.currentUser?.email,userInfo[0]?.id]);

  console.log(userInfo[0]?.id,"user1")
  console.log(auth.currentUser?.email)
  // 

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
          <Text style={{ fontSize: 26 }}>Order History</Text>
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
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.row}>
            <Text style={styles.headerCell}>Id</Text>
            <Text style={styles.headerCell}>Date</Text>
            <Text style={styles.headerCell}>Status</Text>
            <Text style={styles.headerCell}>Amount</Text>
            <Text style={styles.headerCell}>Actions</Text>
          </View>

          {/* Table Body */}
          {orderList.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>#{item.id}</Text>
              <Text style={styles.cell}>
                {format(parseISO(item.date_created), "dd/MM/yy HH:mm:ss")}
              </Text>
              <Text style={styles.cell}>{item.status}</Text>
              <Text style={styles.cell}>TK. {item.total}</Text>
              <TouchableOpacity onPress={()=>navigation.navigate("Order Details",{item:item})} style={{flex:1,backgroundColor:"#e7205b",paddingTop:3,paddingBottom:3,
              borderRadius:5,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"#fff"}}>View</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity><Text>Cancel</Text></TouchableOpacity> */}
            </View>
          ))}
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
  tableContainer: {
    flex: 1,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    flex: 1,
  },
});
