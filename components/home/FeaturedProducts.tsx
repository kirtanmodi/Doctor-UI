import React from "react";
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

const ProductCard: React.FC<{ name: string; image: string }> = ({ name, image }) => {
  const cardBackground = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  return (
    <TouchableOpacity style={[styles.productCard, { backgroundColor: cardBackground }]}>
      <Image source={{ uri: image }} style={styles.productImage} />
      <ThemedText style={[styles.productName, { backgroundColor: `${tintColor}33` }]}>{name}</ThemedText>
    </TouchableOpacity>
  );
};

export const FeaturedProducts: React.FC = () => {
  const products = [
    {
      id: "1",
      name: "Advanced Hydrating Serum",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4-4Am-N9paxA2qreSy21AtYhlZRJeHCejg&s",
    },
    {
      id: "2",
      name: "Anti-Aging Night Cream",
      image: "https://assets.ajio.com/medias/sys_master/root/20231012/Vpam/6527f327ddf779151936eb55/-473Wx593H-466699750-clear-MODEL6.jpg",
    },
    {
      id: "3",
      name: "Facial Cleanser",
      image: "https://assets.ajio.com/medias/sys_master/root/20231012/Vpam/6527f327ddf779151936eb55/-473Wx593H-466699750-clear-MODEL6.jpg",
    },
  ];

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Featured Products</ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {products.map((product) => (
          <ProductCard key={product.id} name={product.name} image={product.image} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollView: {
    paddingVertical: 10,
  },
  productCard: {
    width: 150,
    marginRight: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  productName: {
    padding: 10,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Inter-Regular",
    height: 80,
  },
});
