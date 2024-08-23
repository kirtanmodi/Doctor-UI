import React from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const QuickActions: React.FC = () => {
  const tintColor = useThemeColor({}, "tint");
  const accentColor = useThemeColor({}, "accent");
  const router = useRouter();

  const handleScheduleAppointment = () => router.push("/appointment");
  const handleVirtualConsultation = () => router.push("/virtualConsultation");

  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const animatedStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -5],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.actionButton, animatedStyle]}>
        <TouchableOpacity onPress={handleScheduleAppointment} style={[styles.buttonContent, { backgroundColor: "rgba(255, 255, 255, 0.1)" }]}>
          <Ionicons name="calendar" size={32} color={tintColor} />
          <ThemedText style={styles.actionButtonText}>Schedule Appointment</ThemedText>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.actionButton, animatedStyle]}>
        <TouchableOpacity onPress={handleVirtualConsultation} style={[styles.buttonContent, { backgroundColor: "rgba(255, 255, 255, 0.1)" }]}>
          <Ionicons name="videocam" size={32} color={accentColor} />
          <ThemedText style={styles.actionButtonText}>Virtual Consultation</ThemedText>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  actionButton: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    overflow: "hidden",
  },
  buttonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  actionButtonText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
