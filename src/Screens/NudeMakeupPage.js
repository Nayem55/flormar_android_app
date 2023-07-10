import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Dimensions,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
import Product from "../Components/Product";
import BottomBar from "../Components/BottomBar";
  
  const NudeMakeupPage = () => {
    const [shopList, setShopList] = useState([]);
    const [pages, setPages] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loadData, setLoadData] = useState(false);
    const deviceHeight = Dimensions.get("window").height;
  
    useEffect(() => {
      setLoading(true);
      fetch(
        `http://192.168.0.30:5000/getNudeMakeUpProducts?page=${pageCount}`
      )
        .then((res) => res.json())
        .then((data) => {
          setShopList([...shopList, ...data[0]]);
          setPages(data[1]);
          setLoading(false);
          setLoadData(false);
        });
    }, [pageCount]);
  
  
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
          {loading && (
            <ActivityIndicator size={"large"} color="#ef4f85"></ActivityIndicator>
          )}
        </View>
      );
    };
  
    useEffect(() => {
      if (loadData) {
        if (pages > pageCount) {
          setPageCount(pageCount + 1);
        }
      }
    }, [loadData]);
  
    console.log(pages, pageCount);
  
    return (
      <View style={{flex:1, backgroundColor: "#fceef2", heigth: deviceHeight }}>
        <FlatList
          data={shopList}
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
                  Sorry ! We Don,t Have The Selected Category Available For Now
                </Text>
              </View>
            )
          }
        />
        <BottomBar></BottomBar>
      </View>
    );
  };
  
  export default NudeMakeupPage;
  
  const styles = {
    container: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    },
    categoryBar: {
      width: "100%",
      height: 60,
      backgroundColor: "#ef4f85",
      padding: 15,
    },
    categoryBarButton: {
      marginRight: 10,
      backgroundColor: "#fff",
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 6,
      paddingBottom: 6,
      borderRadius: 20,
    },
    categoryBarText: {
      fontWeight: "bold",
      fontSize: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    selectedButton: {
      backgroundColor: "#000",
    },
    selectedText: {
      color: "#fff",
    },
    flatList: {
      backgroundColor: "#fceef2",
    },
  };
  