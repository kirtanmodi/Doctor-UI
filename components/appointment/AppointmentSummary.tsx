import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface AppointmentSummaryProps {
  selectedDate: string;
  selectedDoctor: { name: string } | null;
  selectedType: { name: string } | null;
  selectedTime: string;
}

const AppointmentSummary: React.FC<AppointmentSummaryProps> = ({ selectedDate, selectedDoctor, selectedType, selectedTime }) => {
  return (
    <ThemedView style={styles.summaryContainer}>
      <ThemedText style={styles.summaryTitle}>Appointment Summary</ThemedText>
      <ThemedText style={styles.summaryText}>Date: {selectedDate || "Not selected"}</ThemedText>
      <ThemedText style={styles.summaryText}>Doctor: {selectedDoctor ? selectedDoctor.name : "Not selected"}</ThemedText>
      <ThemedText style={styles.summaryText}>Type: {selectedType ? selectedType.name : "Not selected"}</ThemedText>
      <ThemedText style={styles.summaryText}>Time: {selectedTime || "Not selected"}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AppointmentSummary;
