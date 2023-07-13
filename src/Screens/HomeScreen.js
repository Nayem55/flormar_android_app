import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Header from "../Common/Header";
import Home from "./Tabs/Home";
import BottomBar from "../Components/BottomBar";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import Product from "../Components/Product";
const deviceHeight = Dimensions.get("window").height;

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [pages, setPages] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://192.168.0.30:5000/search?page=${pageCount}&keyword=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchList([...searchList, ...data[0]]);
        
        setPages(data[1]);
        setLoading(false);
        setLoadData(false);
      });
  }, [pageCount,searchText]);

  useEffect(() => {
    if (loadData) {
      if (pages > pageCount) {
        setPageCount(pageCount + 1);
      }
    }
  }, [loadData]);

  const handleChangeSearch = (newName) => {
    setSearchText(newName);
    setPageCount(1);
    setPages(0)
    setSearchList([])
  };

  console.log(searchText,pages, pageCount);

  const ListEndLoader = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingTop: 10,
          marginLeft: "-4%",
          paddingBottom: 15,
        }}
      >
        {(loading && searchText) && (
          <ActivityIndicator size={"large"} color="#ef4f85"></ActivityIndicator>
        )}
      </View>
    );
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  console.log(toggleModal)
  return (
    <View style={styles.container}>
      {/*............... header............... */}
      <Header
        leftIcon={require("../Images/menu.png")}
        rightIcon={require("../Images/search.png")}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
        onClickRightIcon={() => {
          toggleModal();
        }}
      ></Header>
      {/* ...................search modal................. */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Ionicons name="close-circle" size={48} color="black" />
          </TouchableOpacity>

          <View style={styles.modalContent}>
            <View style={{marginLeft:20,marginRight:20}}>
              <TextInput
                style={styles.input}
                placeholder="Search products"
                value={searchText}
                onChangeText={handleChangeSearch}
              />
            </View>
            <FlatList
              data={searchList}
              renderItem={({ item }) => <Product product={item} />}
              onEndReached={() => setLoadData(true)}
              keyExtractor={(item) => item.id.toString()}
              onEndReachedThreshold={0.8}
              ListFooterComponent={ListEndLoader} // Loader when loading next page.
              contentContainerStyle={{ paddingLeft: "4%", paddingBottom: 100 }}
              numColumns={2}
              style={styles.flatList}
              ListEmptyComponent={() =>
                !loading &&
                pages < 1 && (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fceef2",
                      paddingTop: 100,
                    }}
                  >
                    <Text style={{ fontSize: 18, textAlign: "center" }}>
                      {" "}
                      Sorry ! We Don,t Have The Selected Category Available For
                      Now
                    </Text>
                  </View>
                )
              }
            />
          </View>
        </View>
      </Modal>

      {/*..............screen content.............. */}
      <Home></Home>

      {/*............. bottomBar.................. */}
      <BottomBar></BottomBar>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  bottomTab: {
    width: "25%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTabIcon: {
    width: 24,
    height: 24,
  },
  activeColor: {
    tintColor: "#e7205b",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical:20,
    paddingBottom:80

  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 60,
  },
  flatList: {
    backgroundColor: "#fceef2",
    height:deviceHeight,
  },
});
