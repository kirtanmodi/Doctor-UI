import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export const FeaturedProducts: React.FC = () => {
  const tintColor = useThemeColor({}, "tint");
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push("/products")}>
      <LinearGradient colors={["rgba(255,255,255,0.05)", "rgba(255,255,255,0.1)"]} style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Featured</ThemedText>
          <Ionicons name="arrow-forward-outline" size={24} color={tintColor} />
        </View>
        <View style={styles.productList}>
          {[
            {
              name: "Hydrating Serum",
              uri: "https://assets.ajio.com/medias/sys_master/root/20231012/Vpam/6527f327ddf779151936eb55/-473Wx593H-466699750-clear-MODEL6.jpg",
            },
            { name: "Night Cream", uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4-4Am-N9paxA2qreSy21AtYhlZRJeHCejg&s" },
          ].map((product, index) => (
            <View key={index} style={styles.productItem}>
              <Image source={{ uri: product.uri }} style={styles.productImage} />
              <ThemedText style={styles.productName}>{product.name}</ThemedText>
            </View>
          ))}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  productList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productItem: {
    alignItems: "center",
    width: "48%",
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginBottom: 10,
  },
  productName: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});
