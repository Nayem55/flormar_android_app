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

const EyesCategory = () => {
  const [eyesProducts, setEyesProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [pages, setPages] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [id, setId] = useState(71);
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
        setEyesProducts([...eyesProducts, ...data[0]]);
        setPages(data[1]);
        setLoading(false);
        setLoadData(false);
        setIsCategoryChanged(false);
      });
  }, [selectedCategory, pageCount]);

  useEffect(() => {
    setIsCategoryChanged(true);
  }, [selectedCategory]);

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
        {/* ............................category bar............................... */}

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.categoryBar}
        >
          <TouchableOpacity
            onPress={() => {
              setEyesProducts([]);
              setSelectedCategory(1);
              setId(81);
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
              EYE LINER
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEyesProducts([]);
              setSelectedCategory(2);
              setId(82);
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
              EYE PENCIL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEyesProducts([]);
              setSelectedCategory(3);
              setId(83);
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
              MASCARA
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEyesProducts([]);
              setSelectedCategory(4);
              setId(92);
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
              EYE SHADOW
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEyesProducts([]);
              setSelectedCategory(5);
              setId(94);
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
              EYE PRIMER
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEyesProducts([]);
              setSelectedCategory(6);
              setId(1375);
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
              POMADE
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
      <FlatList
        data={eyesProducts}
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
    </View>
  );
};

export default EyesCategory;

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
