import React from "react";
import { View, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

export const Header = ({ t }: { t: (key: string) => string }) => {
  const tintColor = useThemeColor({}, "tint");

  const handleNavigateToNotifications = () => {
    router.push("/notifications");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://st3.depositphotos.com/16122460/34043/i/450/depositphotos_340438794-stock-photo-pink-ribbon-breast-cancer-awareness.jpg",
      }}
      style={styles.headerBackground}
    >
      <LinearGradient colors={["rgba(0,0,0,0.6)", "transparent"]} style={styles.headerGradient}>
        <View style={styles.header}>
          <View>
            <ThemedText style={styles.welcomeText}>{t("welcome")},</ThemedText>
            <ThemedText style={styles.patientName}>Sarah</ThemedText>
          </View>
          <TouchableOpacity style={styles.notificationsButton} onPress={handleNavigateToNotifications}>
            <BlurView intensity={80} tint="light" style={styles.blurView}>
              <Ionicons name="notifications-outline" size={24} color={tintColor} />
            </BlurView>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    height: 200,
  },
  headerGradient: {
    flex: 1,
    justifyContent: "flex-end",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: "white",
    opacity: 0.9,
  },
  patientName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  notificationsButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  blurView: {
    padding: 10,
    borderRadius: 20,
  },
});
