import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  useWindowDimensions 
} from "react-native";
import StarRating from "../Components/Ratings";
import Icon from "react-native-vector-icons/FontAwesome";
import HTML from 'react-native-render-html';

const ProductDetails = ({ route }) => {
  const { product } = route.params;
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isShipInfoOpen, setIsShipInfoOpen] = useState(false);
  const [value, setValue] = useState(1);
  const windowWidth = useWindowDimensions().width;
  // console.log(product.attributes.length);

  const handleMinus = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const handlePlus = () => {
    setValue(value + 1);
  };


  return (
    <ScrollView style={styles.container}>
      <View style={{ backgroundColor: "#fff", padding: 10 }}>
        <Image
          style={styles.image}
          source={{ uri: product?.images[0]?.src }}
        ></Image>
      </View>

      <View style={styles.details}>
        <Text style={styles.name}>{product?.name}</Text>
        {/* .............ratings................ */}
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <StarRating product={product}></StarRating>
          <Text style={{ color: "#000", opacity: 0.5 }}>
            ({product.rating_count} customer reviews)
          </Text>
        </View>

        {/* .............price................ */}
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text style={styles.price}>
            TK.{" "}
            {product?.on_sale ? product?.sale_price : product?.regular_price}
          </Text>
          <Text
            style={{
              textDecorationLine: "line-through",
              textDecorationStyle: "solid",
              color: "#000",
              opacity: 0.5,
              fontSize: 20,
              paddingTop: 10,
            }}
          >
            {product?.on_sale && `TK. ${product?.regular_price}`}
          </Text>
        </View>

        {/* ...................description.................. */}
        <Text
          style={{ color: "#000", opacity: 0.5, fontSize: 15, paddingTop: 10 }}
        >
          {product.short_description}
        </Text>

        {/* ......................attributes............................ */}
        <View style={{ flex: 1, marginBottom: 20 }}>
          {product.attributes.map((attribute) => (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20 }}>{attribute.name}</Text>
                <Text style={{ color: "#000", opacity: 0.5 }}>
                  {attribute.options}
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
            </View>
          ))}
        </View>

        {/* ...................stock status .......................*/}
        <View
          style={[styles.stock, product.stock_quantity < 1 && style.outStock]}
        >
          {product.stock_quantity > 0 && (
            <Icon name="check" size={18} color="white" />
          )}
          <Text style={{ color: "#fff" }}>
            {product.stock_quantity > 0 ? "In Stock" : "Out Stock"}
          </Text>
        </View>

        {/* ........................cart option .........................*/}
        <View style={{ flex: 1, flexDirection: "row", gap: 10, marginTop: 20 }}>
          <View style={styles.quantity}>
            <TouchableOpacity style={styles.button} onPress={handleMinus}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={value.toString()}
              onChangeText={(text) => setValue(parseInt(text))}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handlePlus}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cartBtn}>
            <Text style={{ color: "#fff" }}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>

        {/* ..................buy button................. */}
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            padding: 10,
            marginTop: 10,
            width: "40%",
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>BUY NOW</Text>
        </TouchableOpacity>

        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
            borderStyle: "dotted",
            marginTop: 24,
            opacity: 0.2,
          }}
        ></View>

        <View>
          <Text style={{ fontSize: 18, marginTop: 10 }}>
            SKU: <Text style={{ color: "#7b7783" }}>{product.sku}</Text>
          </Text>
          <Text style={{ fontSize: 18, marginTop: 10 }}>
            CATEGORY:{" "}
            {product.categories.map((category) => (
              <Text style={{ color: "#7b7783" }}>{category.name}, </Text>
            ))}
          </Text>
          <Text style={{ fontSize: 18, marginTop: 10 }}>
            TAGS:{" "}
            {product.tags.map((tag) => (
              <Text style={{ color: "#7b7783" }}>{tag.name}, </Text>
            ))}
          </Text>
        </View>

        {/* ....................dropdown........................ */}
        <View style={{marginTop:20}}>
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownHeader}
              onPress={()=>setIsDescOpen(!isDescOpen)}
            >
              <Text style={styles.dropdownHeaderText}>Description</Text>
            </TouchableOpacity>

            <View
              style={[
                styles.dropdownContent,
                isDescOpen ? styles.show : styles.hide,
              ]}
            >
              <HTML style={styles.dropdownText} source={{ html: product.description }} contentWidth={windowWidth}/>
            </View>
          </View>

          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownHeader}
              onPress={()=>setIsReviewOpen(!isReviewOpen)}
            >
              <Text style={styles.dropdownHeaderText}>REVIEWS ({product.rating_count})</Text>
            </TouchableOpacity>

            <View
              style={[
                styles.dropdownContent,
                isReviewOpen ? styles.show : styles.hide,
              ]}
            >
              <HTML style={styles.dropdownText} source={{ html: product.description }} contentWidth={windowWidth}/>
            </View>
          </View>

          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownHeader}
              onPress={()=>setIsShipInfoOpen(!isShipInfoOpen)}
            >
              <Text style={styles.dropdownHeaderText}>SHIPPING & DELIVERY</Text>
            </TouchableOpacity>

            <View
              style={[
                styles.dropdownContent,
                isShipInfoOpen ? styles.show : styles.hide,
              ]}
            >
            <HTML style={styles.dropdownText} source={{ html: product.description }} contentWidth={windowWidth}/>
            </View>
          </View>


        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fceef2",
  },

  image: {
    height: 400,
  },
  details: {
    padding: 15,
    marginBottom: 30,
  },
  price: {
    fontSize: 22,
    paddingTop: 8,
    color: "#ef4f85",
    fontWeight: "bold",
  },
  name: {
    fontSize: 24,
  },
  stock: {
    backgroundColor: "#bdd971",
    padding: 10,
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  outStock: {
    backgroundColor: "#e34b6c",
  },
  cartBtn: {
    width: "40%",
    padding: 8,
    backgroundColor: "#ef4f85",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: "#DDDDDD",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  dropdownHeader: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  dropdownHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  dropdownContent: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 14,
    color: "black",
    marginBottom: 5,
  },
  show: {
    height: "auto",
    marginBottom:10
  },
  hide: {
    height: 0,
    padding: 0,
  },
});
