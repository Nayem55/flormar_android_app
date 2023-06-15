import React from "react";
import { Text, View, Image, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
const { width } = Dimensions.get("window");

const styles = {
  container: {
    flex: 1,
  },

  wrapper: {
    flexDirection:"row",
    justifyContent:"center"
  },

  slide: {
    flex: 1,
  },

  image: {
    flex: 1,
  },
};

const ProductImageSwiper=({product})=> {
 
    return (
      <View style={styles.container}>
        <Swiper activeDotColor="#ef4f85" style={styles.wrapper} height={400} horizontal={true} autoplay autoplayTimeout={5}>
          {
            product.images.map(image=><View style={styles.slide}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={{ uri: image.src }}
            />
          </View>)
          }
        </Swiper>
        
      </View>
    );
}

export default ProductImageSwiper;
