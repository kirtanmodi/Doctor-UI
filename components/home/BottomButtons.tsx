import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";

export const BottomButtons: React.FC = () => {
  const tintColor = useThemeColor({}, "tint");
  const router = useRouter();

  return (
    <View style={styles.bottomButtons}>
      <TouchableOpacity style={styles.bottomButton} onPress={() => router.push("/chatSupport")}>
        <Ionicons name="chatbubbles-outline" size={24} color={tintColor} />
        <ThemedText style={styles.bottomButtonText}>Chat Support</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomButton} onPress={() => router.push("/feedbackReviews")}>
        <Ionicons name="star-outline" size={24} color={tintColor} />
        <ThemedText style={styles.bottomButtonText}>Feedback & Reviews</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 15,
    width: "48%",
  },
  bottomButtonText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
});
