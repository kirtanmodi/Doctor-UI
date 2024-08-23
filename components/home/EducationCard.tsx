import React from "react";
import { StyleSheet, TouchableOpacity, ImageBackground, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export const EducationCard: React.FC = () => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.educationCard} onPress={() => router.push("/educationalContent")}>
      <ImageBackground
        source={{ uri: "https://joyalbeauty.com/cdn/shop/articles/MORNING_REGIMEN_1024x.png?v=1708782720" }}
        style={styles.educationImage}
      >
        <LinearGradient colors={["rgba(0,0,0,0.7)", "transparent"]} style={styles.educationGradient}>
          <ThemedText style={styles.educationTitle}>Educational Content</ThemedText>
          <ThemedText style={styles.educationDescription}>Explore skincare tips and tutorials</ThemedText>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  educationCard: {
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  educationImage: {
    width: "100%",
    height: 150,
  },
  educationGradient: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  educationTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  educationDescription: {
    color: "white",
    fontSize: 16,
  },
});
