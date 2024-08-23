import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";

interface ConfirmButtonProps {
  onPress: () => void;
  backgroundColor: string;
  tintColor: string;
  accentColor: string;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onPress, backgroundColor, tintColor, accentColor }) => {
  return (
    <TouchableOpacity style={styles.confirmButton} onPress={onPress}>
      <LinearGradient colors={[tintColor, `${tintColor}40`]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.confirmButtonGradient}>
        <ThemedText style={styles.confirmButtonText}>Confirm Appointment</ThemedText>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  confirmButton: {
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  confirmButtonGradient: {
    padding: 15,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ConfirmButton;
