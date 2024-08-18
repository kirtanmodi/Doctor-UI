import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Home = () => {
  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");

  const handleScheduleAppointment = () => {
    router.push("/appointment");
  };

  const handleVirtualConsultation = () => {
    router.push("/virtualConsultation");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.welcomeText} type="title">
          Welcome, Patient
        </ThemedText>

        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: tintColor }]} onPress={handleScheduleAppointment}>
            <Ionicons name="calendar" size={24} color={backgroundColor} />
            <ThemedText style={styles.actionButtonText}>Schedule Appointment</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: tintColor }]} onPress={handleVirtualConsultation}>
            <Ionicons name="videocam" size={24} color={backgroundColor} />
            <ThemedText style={styles.actionButtonText}>Virtual Consultation</ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle} type="subtitle">
            Latest Offers
          </ThemedText>
          <ThemedText>20% off on all skincare consultations this week!</ThemedText>
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle} type="subtitle">
            Featured Products
          </ThemedText>
          <ThemedText>Advanced Hydrating Serum</ThemedText>
          <ThemedText>Anti-Aging Night Cream</ThemedText>
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle} type="subtitle">
            Educational Content
          </ThemedText>
          <TouchableOpacity>
            <ThemedText style={{ color: tintColor }}>5 Tips for Healthy Skin</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity>
            <ThemedText style={{ color: tintColor }}>Understanding Acne: Causes and Treatments</ThemedText>
          </TouchableOpacity>
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
    paddingBottom: 40,
  },
  welcomeText: {
    marginBottom: 20,
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    width: "48%",
  },
  actionButtonText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  sectionContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  sectionTitle: {
    marginBottom: 10,
  },
});

export default Home;
