import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface GalleryItem {
  id: string;
  treatmentType: string;
  beforeImage: string;
  afterImage: string;
  patientStory: string;
}

const BeforeAfterGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  useEffect(() => {
    // Fetch gallery items from API or load from local data
    const mockGalleryItems: GalleryItem[] = [
      {
        id: "1",
        treatmentType: "Skin Rejuvenation",
        beforeImage: "https://example.com/before1.jpg",
        afterImage: "https://example.com/after1.jpg",
        patientStory: "I'm amazed by the results! My skin looks 10 years younger.",
      },
    ];
    setGalleryItems(mockGalleryItems);
  }, []);

  const renderGalleryItem = ({ item }: { item: GalleryItem }) => (
    <TouchableOpacity style={styles.galleryItem} onPress={() => setSelectedItem(item)}>
      <Image source={{ uri: item.beforeImage }} style={styles.thumbnailImage} />
      <Image source={{ uri: item.afterImage }} style={styles.thumbnailImage} />
      <ThemedText style={styles.treatmentType}>{item.treatmentType}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ThemedText style={styles.title}>Before & After Gallery</ThemedText>
      <FlatList
        data={galleryItems}
        renderItem={renderGalleryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.galleryGrid}
      />
      {selectedItem && (
        <ThemedView style={styles.modalContainer}>
          <ScrollView>
            <Image source={{ uri: selectedItem.beforeImage }} style={styles.fullImage} />
            <Image source={{ uri: selectedItem.afterImage }} style={styles.fullImage} />
            <ThemedText style={styles.patientStory}>{selectedItem.patientStory}</ThemedText>
            <TouchableOpacity onPress={() => setSelectedItem(null)}>
              <ThemedText style={styles.closeButton}>Close</ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </ThemedView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
  },
  galleryGrid: {
    padding: 10,
  },
  galleryItem: {
    flex: 1,
    margin: 5,
    alignItems: "center",
  },
  thumbnailImage: {
    width: 150,
    height: 150,
    marginBottom: 5,
  },
  treatmentType: {
    textAlign: "center",
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  fullImage: {
    width: "100%",
    height: 300,
    marginBottom: 10,
  },
  patientStory: {
    marginBottom: 20,
  },
  closeButton: {
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
  },
});

export default BeforeAfterGallery;
