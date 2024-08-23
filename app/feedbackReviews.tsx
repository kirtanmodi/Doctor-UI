import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

interface Review {
  id: string;
  rating: number;
  comment: string;
  service: string;
  date: Date;
}

const FeedbackReviews: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [service, setService] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterService, setFilterService] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  useEffect(() => {
    // Simulating fetching reviews from an API
    const mockReviews: Review[] = [
      { id: "1", rating: 5, comment: "Great service!", service: "Consultation", date: new Date(2023, 3, 15) },
      { id: "2", rating: 4, comment: "Good experience overall.", service: "Treatment", date: new Date(2023, 3, 10) },
    ];
    setReviews(mockReviews);
  }, []);

  const handleSubmitFeedback = () => {
    if (rating === 0 || !comment.trim() || !service) {
      alert("Please fill in all fields");
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      rating,
      comment,
      service,
      date: new Date(),
    };

    setReviews((prevReviews) => [newReview, ...prevReviews]);
    setRating(0);
    setComment("");
    setService("");
    alert("Thank you for your feedback!");
  };

  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
          <Ionicons name={index < count ? "star" : "star-outline"} size={30} color={index < count ? tintColor : textColor} />
        </TouchableOpacity>
      ));
  };

  const renderReview = ({ item }: { item: Review }) => (
    <ThemedView style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <ThemedText style={styles.reviewService}>{item.service}</ThemedText>
        <ThemedText style={styles.reviewDate}>{item.date.toLocaleDateString()}</ThemedText>
      </View>
      <View style={styles.starContainer}>{renderStars(item.rating)}</View>
      <ThemedText style={styles.reviewComment}>{item.comment}</ThemedText>
    </ThemedView>
  );

  const filteredReviews = reviews.filter((review) => {
    if (filterService && review.service !== filterService) return false;
    if (filterDate) {
      const reviewDate = review.date.toISOString().split("T")[0];
      if (reviewDate !== filterDate) return false;
    }
    return true;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.title}>Feedback & Reviews</ThemedText>

        <ThemedView style={styles.feedbackForm}>
          <ThemedText style={styles.sectionTitle}>Leave Your Feedback</ThemedText>
          <View style={styles.starContainer}>{renderStars(rating)}</View>
          <Picker selectedValue={service} onValueChange={(itemValue) => setService(itemValue)} style={[styles.picker, { color: textColor }]}>
            <Picker.Item label="Select a service" value="" />
            <Picker.Item label="Consultation" value="Consultation" />
            <Picker.Item label="Treatment" value="Treatment" />
            <Picker.Item label="Follow-up" value="Follow-up" />
          </Picker>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: tintColor }]}
            placeholder="Your comments"
            placeholderTextColor={textColor + "80"}
            value={comment}
            onChangeText={setComment}
            multiline
          />
          <TouchableOpacity style={[styles.submitButton, { backgroundColor: tintColor }]} onPress={handleSubmitFeedback}>
            <ThemedText style={[styles.submitButtonText, { color: backgroundColor }]}>Submit Feedback</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.reviewsSection}>
          <ThemedText style={styles.sectionTitle}>Patient Reviews</ThemedText>
          <FlatList
            data={reviews}
            renderItem={renderReview}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<ThemedText style={styles.emptyText}>No reviews found</ThemedText>}
          />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  feedbackForm: {
    marginBottom: 30,
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  picker: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 100,
  },
  submitButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewsSection: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterPicker: {
    flex: 1,
    marginRight: 10,
  },
  filterInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  reviewItem: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  reviewService: {
    fontWeight: "bold",
  },
  reviewDate: {
    opacity: 0.7,
  },
  reviewComment: {
    marginTop: 5,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    opacity: 0.7,
  },
});

export default FeedbackReviews;
