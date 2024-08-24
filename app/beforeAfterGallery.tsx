import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, Animated, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface GalleryItem {
  id: string;
  treatmentType: string;
  beforeImage: string;
  afterImage: string;
  patientStory: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;

const BeforeAfterGallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [showAfterImage, setShowAfterImage] = useState(false);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const accentColor = useThemeColor({}, "accent");

  const slideAnimation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Fetch gallery items from API or load from local data
    const mockGalleryItems: GalleryItem[] = [
      {
        id: "1",
        treatmentType: "Skin Rejuvenation",
        beforeImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4-4Am-N9paxA2qreSy21AtYhlZRJeHCejg&s",
        afterImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4-4Am-N9paxA2qreSy21AtYhlZRJeHCejg&s",
        patientStory: "I am amazed by the results! My skin looks 10 years younger.",
      },
      {
        id: "2",
        treatmentType: "Acne Treatment",
        beforeImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4-4Am-N9paxA2qreSy21AtYhlZRJeHCejg&s",
        afterImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4-4Am-N9paxA2qreSy21AtYhlZRJeHCejg&s",
        patientStory: "The transformation is incredible. I feel so much more confident now.",
      },
      {
        id: "3",
        treatmentType: "Laser Hair Removal",
        beforeImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4-4Am-N9paxA2qreSy21AtYhlZRJeHCejg&s",
        afterImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4-4Am-N9paxA2qreSy21AtYhlZRJeHCejg&s",
        patientStory: "No more painful waxing sessions. The results are long-lasting!",
      },
    ];
    setGalleryItems(mockGalleryItems);
  }, []);

  const renderGalleryItem = ({ item }: { item: GalleryItem }) => (
    <TouchableOpacity style={styles.galleryItem} onPress={() => setSelectedItem(item)}>
      <Image source={{ uri: item.beforeImage }} style={styles.itemImage} />
      <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} style={styles.itemGradient}>
        <ThemedText style={styles.itemText}>{item.treatmentType}</ThemedText>
      </LinearGradient>
    </TouchableOpacity>
  );

  const toggleBeforeAfter = () => {
    setShowAfterImage(!showAfterImage);
    Animated.timing(slideAnimation, {
      toValue: showAfterImage ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    setSelectedItem(null);
    setShowAfterImage(false);
    slideAnimation.setValue(0);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <LinearGradient
        colors={[backgroundColor, `${tintColor}40`, `${accentColor}90`]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <ThemedText style={styles.title}>Before & After Gallery</ThemedText>
      <FlatList
        data={galleryItems}
        renderItem={renderGalleryItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        snapToInterval={ITEM_WIDTH + 20}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.galleryList}
      />
      <Modal visible={selectedItem !== null} transparent animationType="fade" onRequestClose={closeModal}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeModal}>
          <BlurView intensity={90} tint="dark" style={styles.blurView}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Ionicons name="close" size={24} color={textColor} />
              </TouchableOpacity>
              {selectedItem && (
                <>
                  <View style={styles.imageContainer}>
                    <Animated.View
                      style={[
                        styles.imageWrapper,
                        {
                          transform: [
                            {
                              translateX: slideAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -ITEM_WIDTH],
                              }),
                            },
                          ],
                        },
                      ]}
                    >
                      <Image source={{ uri: selectedItem.beforeImage }} style={styles.fullImage} />
                      <Image source={{ uri: selectedItem.afterImage }} style={styles.fullImage} />
                    </Animated.View>
                    <TouchableOpacity style={styles.toggleButton} onPress={toggleBeforeAfter}>
                      <ThemedText style={styles.toggleButtonText}>{showAfterImage ? "Before" : "After"}</ThemedText>
                    </TouchableOpacity>
                  </View>
                  <ThemedText style={styles.treatmentType}>{selectedItem.treatmentType}</ThemedText>
                  <ThemedText style={styles.patientStory}>{selectedItem.patientStory}</ThemedText>
                </>
              )}
            </View>
          </BlurView>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "Inter-Regular",
  },
  galleryList: {
    paddingHorizontal: 10,
  },
  galleryItem: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
  itemGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
    justifyContent: "flex-end",
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Inter-Regular",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 20,
    overflow: "hidden",
  },
  imageWrapper: {
    flexDirection: "row",
    width: ITEM_WIDTH * 2,
    height: ITEM_HEIGHT,
  },
  fullImage: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  toggleButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 20,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  treatmentType: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "Inter-Regular",
    color: "white",
  },
  patientStory: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    fontFamily: "Inter-Regular",
    color: "white",
  },
});

export default BeforeAfterGallery;
