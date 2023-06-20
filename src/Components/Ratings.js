import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StarRating = ({ product ,fontsize}) => {
  const [selectedRating, setSelectedRating] = useState(product.average_rating);

  const handleRate = (newRating) => {
    setSelectedRating(newRating);
    onRate(newRating);
  };

  const renderStar = (starNumber) => {
    const iconName =
      starNumber <= selectedRating ? "ios-star" : "ios-star-outline";

    return (
      <TouchableOpacity key={starNumber} style={{marginTop:6}} >
        <Ionicons name={iconName} size={fontsize} color="#FFD700" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((starNumber) => renderStar(starNumber))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default StarRating;
