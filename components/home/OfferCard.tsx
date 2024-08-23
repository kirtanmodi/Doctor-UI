import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export const OfferCard: React.FC = () => {
  return (
    <View style={styles.offerCard}>
      <Image
        source={{
          uri: "https://cdn11.bigcommerce.com/s-tbmjggiln3/images/stencil/original/image-manager/soothegroupsamplebanner-1000.jpg?t=1682636805&_gl=1*f79879*_ga*MTExNDE3ODg0OC4xNjA5ODc2Nzg5*_ga_WS2VZYPC6G*MTY4MjYzNjc2Ni4yMzQ4LjEuMTY4MjYzNjc4OC4zOC4wLjA.",
        }}
        style={styles.offerImage}
      />
      <View style={styles.offerContent}>
        <ThemedText style={styles.offerTitle}>Limited Time Offer</ThemedText>
        <ThemedText style={styles.offerDescription}>20% off on all skincare consultations this week!</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  offerCard: {
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  offerImage: {
    width: "100%",
    height: 150,
  },
  offerContent: {
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  offerDescription: {
    fontSize: 14,
  },
});
