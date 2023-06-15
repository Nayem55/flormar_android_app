import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Product from "../Product";

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [pages, setPages] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [id, setId] = useState(20);
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [isCategoryChanged, setIsCategoryChanged] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://192.168.0.30:5000/getProductsByCategories?id=${id}&page=${pageCount}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAccessories([...accessories, ...data[0]]);
        setPages(data[1]);
        setLoading(false);
        setLoadData(false);
        setIsCategoryChanged(false);
      });
  }, [selectedCategory, pageCount]);

  useEffect(() => {
    setIsCategoryChanged(true);
  }, [selectedCategory]);

  console.log(loadData,accessories.length)

  const ListEndLoader = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingTop: 10,
          marginLeft: "-4%",
          paddingBottom: 10,
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
      if (pages > pageCount && !isCategoryChanged) {
        setPageCount(pageCount + 1);
      }
    }
  }, [loadData]);

  console.log(pages, pageCount);

  return (
    <View>
      <ScrollView style={{ backgroundColor: "#fceef2" }} horizontal={false}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.categoryBar}
        >
          <TouchableOpacity
            onPress={() => {
              setAccessories([]);
              setSelectedCategory(1);
              setId(1260);
              setPageCount(1);
            }}
            style={[
              styles.categoryBarButton,
              selectedCategory === 1 && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.categoryBarText,
                selectedCategory === 1 && styles.selectedText,
              ]}
            >
              BRUSH & SPONGE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAccessories([]);
              setSelectedCategory(2);
              setId(1262);
              setPageCount(1);
            }}
            style={[
              styles.categoryBarButton,
              selectedCategory === 2 && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.categoryBarText,
                selectedCategory === 2 && styles.selectedText,
              ]}
            >
              MAKEUP BRUSH SET
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAccessories([]);
              setSelectedCategory(3);
              setId(1263);
              setPageCount(1);
            }}
            style={[
              styles.categoryBarButton,
              selectedCategory === 3 && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.categoryBarText,
                selectedCategory === 3 && styles.selectedText,
              ]}
            >
              EYE & BROW BRUSH
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAccessories([]);
              setSelectedCategory(4);
              setId(1261);
              setPageCount(1);
            }}
            style={[
              styles.categoryBarButton,
              selectedCategory === 4 && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.categoryBarText,
                selectedCategory === 4 && styles.selectedText,
              ]}
            >
              MAKEUP APPLICATOR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAccessories([]);
              setSelectedCategory(5);
              setId(1264);
              setPageCount(1);
            }}
            style={[
              styles.categoryBarButton,
              selectedCategory === 5 && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.categoryBarText,
                selectedCategory === 5 && styles.selectedText,
              ]}
            >
              FACE BRUSH
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAccessories([]);
              setSelectedCategory(6);
              setId(1267);
              setPageCount(1);
            }}
            style={[
              styles.categoryBarButton,
              selectedCategory === 6 && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.categoryBarText,
                selectedCategory === 6 && styles.selectedText,
              ]}
            >
              ARTIFICIAL NAILS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAccessories([]);
              setSelectedCategory(7);
              setId(1266);
              setPageCount(1);
            }}
            style={[
              styles.categoryBarButton,
              selectedCategory === 7 && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.categoryBarText,
                selectedCategory === 7 && styles.selectedText,
              ]}
            >
              NAIL ART
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAccessories([]);
              setSelectedCategory(8);
              setId(1265);
              setPageCount(1);
            }}
            style={[
              styles.categoryBarButton,
              selectedCategory === 8 && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.categoryBarText,
                selectedCategory === 8 && styles.selectedText,
              ]}
            >
              MANICURE SET
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
      <FlatList
        data={accessories}
        renderItem={({ item }) => <Product product={item} />}
        onEndReached={() => setLoadData(true)}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.8}
        ListFooterComponent={ListEndLoader} // Loader when loading next page.
        contentContainerStyle={{ paddingLeft: "4%", paddingBottom: 100 }}
        numColumns={2}
        ListEmptyComponent={() => (
          (!loading && pages< 1) &&
          <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fceef2",
            paddingTop:100
          }}
        >
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            {" "}
            Sorry ! We Don,t Have The Selected Category Available For Now
          </Text>
        </View>
        )}
        style={styles.flatList}
      />
    </View>
  );
};

export default Accessories;

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
