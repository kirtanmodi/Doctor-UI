import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

interface SelectionButtonProps {
  icon: string;
  text: string;
  onPress: () => void;
  tintColor: string;
  accentColor: string;
}

const SelectionButton: React.FC<SelectionButtonProps> = ({ icon, text, onPress, tintColor, accentColor }) => (
  <TouchableOpacity style={styles.selectionButton} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}>
      <Ionicons name={icon as any} size={24} color={tintColor} />
    </View>
    <ThemedText style={styles.selectionText}>{text}</ThemedText>
    <Ionicons name="chevron-forward" size={20} color={tintColor} style={styles.chevron} />
  </TouchableOpacity>
);

interface AppointmentSelectionsProps {
  selectedDoctor: { name: string } | null;
  selectedType: { name: string; icon: string } | null;
  selectedTime: string;
  onSelectDoctor: () => void;
  onSelectType: () => void;
  onSelectTime: () => void;
  tintColor: string;
  accentColor: string;
}

const AppointmentSelections: React.FC<AppointmentSelectionsProps> = ({
  selectedDoctor,
  selectedType,
  selectedTime,
  onSelectDoctor,
  onSelectType,
  onSelectTime,
  tintColor,
  accentColor,
}) => {
  return (
    <View style={styles.container}>
      <SelectionButton
        icon="person-outline"
        text={selectedDoctor ? selectedDoctor.name : "Select Doctor"}
        onPress={onSelectDoctor}
        tintColor={tintColor}
        accentColor={accentColor}
      />
      <SelectionButton
        icon={(selectedType?.icon as any) || "medical-outline"}
        text={selectedType ? selectedType.name : "Select Type"}
        onPress={onSelectType}
        tintColor={tintColor}
        accentColor={accentColor}
      />
      <SelectionButton
        icon="time-outline"
        text={selectedTime || "Select Time"}
        onPress={onSelectTime}
        tintColor={tintColor}
        accentColor={accentColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  selectionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  selectionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  chevron: {
    opacity: 0.5,
  },
});

export default AppointmentSelections;
