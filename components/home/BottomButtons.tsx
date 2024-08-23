import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const BottomButtons: React.FC = () => {
  const tintColor = useThemeColor({}, "tint");
  const backgroundColor = useThemeColor({}, "background");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { backgroundColor: tintColor }]} onPress={() => router.push("/chatSupport")}>
        <Ionicons name="chatbubbles-outline" size={24} color={backgroundColor} />
        <ThemedText style={styles.buttonText}>Chat Support</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: tintColor }]} onPress={() => router.push("/feedbackReviews")}>
        <Ionicons name="star-outline" size={24} color={backgroundColor} />
        <ThemedText style={styles.buttonText}>Feedback</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    marginLeft: 10,
    fontWeight: "bold",
    color: "white",
  },
});
