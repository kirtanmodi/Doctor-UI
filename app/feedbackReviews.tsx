import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, FlatList, Animated, Easing, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface Review {
  id: string;
  rating: number;
  comment: string;
  date: Date;
}

const FeedbackReviews: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const accentColor = useThemeColor({}, "accent");

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Simulating fetching reviews from an API
    const mockReviews: Review[] = [
      { id: "1", rating: 5, comment: "Exceptional service!", date: new Date(2023, 3, 15) },
      { id: "2", rating: 4, comment: "Great experience overall.", date: new Date(2023, 3, 10) },
    ];
    setReviews(mockReviews);

    // Animate the gradient
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const handleSubmitFeedback = () => {
    if (rating === 0 || !comment.trim()) {
      // Show an error message
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      rating,
      comment,
      date: new Date(),
    };

    setReviews((prevReviews) => [newReview, ...prevReviews]);
    setRating(0);
    setComment("");
  };

  const renderStars = (count: number, onPress?: (index: number) => void) => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((index) => (
          <TouchableOpacity key={index} onPress={() => onPress && onPress(index)} style={styles.starButton}>
            <Ionicons name={index <= count ? "star" : "star-outline"} size={24} color={tintColor} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderReview = ({ item }: { item: Review }) => (
    <BlurView intensity={30} tint="light" style={styles.reviewItem}>
      {renderStars(item.rating)}
      <ThemedText style={styles.reviewComment}>{item.comment}</ThemedText>
      <ThemedText style={styles.reviewDate}>{item.date.toLocaleDateString()}</ThemedText>
    </BlurView>
  );

  const interpolatedColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [`${tintColor}40`, `${tintColor}80`, `${tintColor}40`],
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: 0.6 }]}>
        <LinearGradient
          colors={[backgroundColor, `${tintColor}40`, `${accentColor}90`]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <ThemedText style={styles.title}>Feedback & Reviews</ThemedText>

      <BlurView intensity={50} tint="light" style={styles.feedbackForm}>
        <ThemedText style={styles.sectionTitle}>Leave Your Feedback</ThemedText>
        {renderStars(rating, setRating)}
        <TextInput
          style={[styles.input, { color: textColor, borderColor: tintColor }]}
          placeholder="Your comments"
          placeholderTextColor={`${textColor}80`}
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity style={[styles.submitButton, { backgroundColor: tintColor }]} onPress={handleSubmitFeedback}>
          <ThemedText style={styles.submitButtonText}>Submit Feedback</ThemedText>
        </TouchableOpacity>
      </BlurView>

      <ThemedText style={styles.sectionTitle}>Recent Reviews</ThemedText>
      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.reviewsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter-Regular",
    fontWeight: "bold",
    marginBottom: 10,
  },
  feedbackForm: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  starButton: {
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    minHeight: 100,
  },
  submitButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewsList: {
    paddingBottom: 20,
  },
  reviewItem: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
  },
  reviewComment: {
    marginTop: 10,
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    opacity: 0.7,
    alignSelf: "flex-end",
  },
});

export default FeedbackReviews;
