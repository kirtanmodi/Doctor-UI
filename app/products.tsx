import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInRight, Layout } from "react-native-reanimated";
import { BlurView } from "expo-blur";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const accentColor = useThemeColor({}, "accent");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Simulating API call with setTimeout
      setTimeout(() => {
        const mockProducts: Product[] = [
          {
            id: "1",
            name: "Advanced Hydrating Serum",
            category: "Serum",
            price: 49.99,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4-4Am-N9paxA2qreSy21AtYhlZRJeHCejg&s",
          },
          {
            id: "2",
            name: "Anti-Aging Night Cream",
            category: "Moisturizer",
            price: 39.99,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4-4Am-N9paxA2qreSy21AtYhlZRJeHCejg&s",
          },
          {
            id: "3",
            name: "Gentle Foaming Cleanser",
            category: "Cleanser",
            price: 24.99,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4-4Am-N9paxA2qreSy21AtYhlZRJeHCejg&s",
          },
          {
            id: "4",
            name: "Vitamin C Brightening Mask",
            category: "Mask",
            price: 34.99,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4-4Am-N9paxA2qreSy21AtYhlZRJeHCejg&s",
          },
          {
            id: "5",
            name: "Vitamin C Brightening Mask",
            category: "Mask",
            price: 34.99,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4-4Am-N9paxA2qreSy21AtYhlZRJeHCejg&s",
          },
          {
            id: "6",
            name: "Vitamin C Brightening Mask",
            category: "Mask",
            price: 34.99,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4-4Am-N9paxA2qreSy21AtYhlZRJeHCejg&s",
          },
        ];
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
      setLoading(false);
    }
  };

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      const filtered = products.filter(
        (product) => product.name.toLowerCase().includes(query.toLowerCase()) || product.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    },
    [products]
  );

  const handleProductPress = useCallback((productId: string) => {
    router.push({
      pathname: "/product/[id]",
      params: { id: productId },
    });
  }, []);

  const renderProductItem = useCallback(
    ({ item, index }: { item: Product; index: number }) => (
      <AnimatedTouchableOpacity
        style={styles.productItem}
        onPress={() => handleProductPress(item.id)}
        entering={FadeInRight.delay(index * 100)}
        layout={Layout.springify()}
      >
        <BlurView intensity={20} tint="light" style={styles.productContent}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <ThemedText style={styles.productName}>{item.name}</ThemedText>
            <ThemedText style={styles.productCategory}>{item.category}</ThemedText>
            <ThemedText style={styles.productPrice}>${item.price.toFixed(2)}</ThemedText>
          </View>
        </BlurView>
      </AnimatedTouchableOpacity>
    ),
    [handleProductPress]
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={tintColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
          <ThemedText style={styles.retryButtonText}>Retry</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <LinearGradient
        colors={[backgroundColor, `${tintColor}40`, `${accentColor}40`]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Our Products</ThemedText>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color={textColor} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: textColor }]}
          placeholder="Search products..."
          placeholderTextColor={`${textColor}80`}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {filteredProducts.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <ThemedText style={styles.noResultsText}>No products found</ThemedText>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
          style={styles.productList}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  productList: {
    padding: 10,
    fontFamily: "Inter-Regular",
  },
  productItem: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  productContent: {
    flexDirection: "row",
    padding: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
    fontFamily: "Inter-Regular",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Inter-Regular",
  },
  productCategory: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 5,
    fontFamily: "Inter-Regular",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter-Regular",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 18,
    opacity: 0.7,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Products;
