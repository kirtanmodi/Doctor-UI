import React from "react";
import { View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export const EducationCard: React.FC = () => {
  const tintColor = useThemeColor({}, "tint");
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push("/educationalContent")}>
      <ImageBackground
        source={{ uri: "https://joyalbeauty.com/cdn/shop/articles/MORNING_REGIMEN_1024x.png?v=1708782720" }}
        style={styles.card}
        imageStyle={styles.image}
      >
        <LinearGradient colors={["rgba(0,0,0,0.6)", "transparent"]} style={styles.gradient}>
          <View style={styles.content}>
            <ThemedText style={styles.title}>Skin Care Education</ThemedText>
            <ThemedText style={styles.description}>Learn about the best practices for your skin type</ThemedText>
            <TouchableOpacity style={[styles.button, { backgroundColor: tintColor }]}>
              <ThemedText style={styles.buttonText}>Explore</ThemedText>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    marginVertical: 15,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
