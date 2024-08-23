import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export const QuickActions: React.FC = () => {
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const router = useRouter();

  const handleScheduleAppointment = () => {
    router.push("/appointment");
  };

  const handleVirtualConsultation = () => {
    router.push("/virtualConsultation");
  };

  return (
    <View style={styles.quickActionsContainer}>
      <TouchableOpacity style={styles.actionButton} onPress={handleScheduleAppointment}>
        <LinearGradient colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]} style={styles.gradient}>
          <Ionicons name="calendar-outline" size={28} color={tintColor} />
          <ThemedText style={[styles.actionButtonText, { color: textColor }]}>Schedule</ThemedText>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={handleVirtualConsultation}>
        <LinearGradient colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]} style={styles.gradient}>
          <Ionicons name="videocam-outline" size={28} color={tintColor} />
          <ThemedText style={[styles.actionButtonText, { color: textColor }]}>Consult</ThemedText>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  actionButton: {
    width: "48%",
    borderRadius: 20,
    overflow: "hidden",
  },
  gradient: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 20,
  },
  actionButtonText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
  },
});
