import React, { useState, useCallback } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity, Modal, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

interface Doctor {
  id: number;
  name: string;
}

interface AppointmentType {
  id: number;
  name: string;
}

const doctors: Doctor[] = [
  { id: 1, name: "Dr. Smith" },
  { id: 2, name: "Dr. Johnson" },
  { id: 3, name: "Dr. Williams" },
];

const appointmentTypes: AppointmentType[] = [
  { id: 1, name: "In-person Consultation" },
  { id: 2, name: "Virtual Consultation" },
];

const timeSlots: string[] = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];

const useModalState = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<"doctor" | "type" | "time" | null>(null);

  const openModal = useCallback((newContent: "doctor" | "type" | "time") => {
    setContent(newContent);
    setIsVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setContent(null);
  }, []);

  return { isVisible, content, openModal, closeModal };
};

const useAppointmentState = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const isAppointmentComplete = useCallback(() => {
    return Boolean(selectedDate && selectedDoctor && selectedType && selectedTime);
  }, [selectedDate, selectedDoctor, selectedType, selectedTime]);

  return {
    selectedDate,
    setSelectedDate,
    selectedDoctor,
    setSelectedDoctor,
    selectedType,
    setSelectedType,
    selectedTime,
    setSelectedTime,
    isAppointmentComplete,
  };
};

const AppointmentScreen: React.FC = () => {
  const { isVisible, content, openModal, closeModal } = useModalState();
  const {
    selectedDate,
    setSelectedDate,
    selectedDoctor,
    setSelectedDoctor,
    selectedType,
    setSelectedType,
    selectedTime,
    setSelectedTime,
    isAppointmentComplete,
  } = useAppointmentState();

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "tint");

  const handleConfirm = useCallback(() => {
    if (!isAppointmentComplete()) {
      Alert.alert("Incomplete Information", "Please fill in all fields before confirming.");
      return;
    }

    // Here you would typically send the appointment data to your backend
    console.log("Appointment confirmed:", { selectedDate, selectedDoctor, selectedType, selectedTime });

    // Navigate back to home screen or to a confirmation screen
    router.push("/home");
  }, [selectedDate, selectedDoctor, selectedType, selectedTime, isAppointmentComplete]);

  const renderModalContent = useCallback(() => {
    let data: any[] = [];
    let onSelect: (item: any) => void;

    switch (content) {
      case "doctor":
        data = doctors;
        onSelect = (item: Doctor) => setSelectedDoctor(item.name);
        break;
      case "type":
        data = appointmentTypes;
        onSelect = (item: AppointmentType) => setSelectedType(item.name);
        break;
      case "time":
        data = timeSlots;
        onSelect = (item: string) => setSelectedTime(item);
        break;
      default:
        return null;
    }

    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id?.toString() || item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => {
              onSelect(item);
              closeModal();
            }}
          >
            <ThemedText>{item.name || item}</ThemedText>
          </TouchableOpacity>
        )}
      />
    );
  }, [content, setSelectedDoctor, setSelectedType, setSelectedTime, closeModal]);

  const renderSelectButton = useCallback(
    (label: string, value: string, onPress: () => void) => (
      <TouchableOpacity style={[styles.selectButton, { borderColor }]} onPress={onPress}>
        <ThemedText style={styles.selectButtonText}>{value || label}</ThemedText>
        <Ionicons name="chevron-down" size={24} color={tintColor} />
      </TouchableOpacity>
    ),
    [borderColor, tintColor]
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.title} type="title">
          Schedule Appointment
        </ThemedText>

        <ThemedView style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: tintColor },
            }}
            theme={{
              backgroundColor,
              calendarBackground: backgroundColor,
              textSectionTitleColor: textColor,
              selectedDayBackgroundColor: tintColor,
              selectedDayTextColor: backgroundColor,
              todayTextColor: tintColor,
              dayTextColor: textColor,
              textDisabledColor: "#d9e1e8",
              arrowColor: tintColor,
              monthTextColor: textColor,
              indicatorColor: tintColor,
            }}
          />
        </ThemedView>

        <ThemedView style={styles.summaryContainer}>
          <ThemedText style={styles.summaryTitle} type="subtitle">
            Appointment Summary
          </ThemedText>
          <ThemedText>Date: {selectedDate || "Not selected"}</ThemedText>
          <ThemedText>Time: {selectedTime || "Not selected"}</ThemedText>
          <ThemedText>Doctor: {selectedDoctor || "Not selected"}</ThemedText>
          <ThemedText>Type: {selectedType || "Not selected"}</ThemedText>
        </ThemedView>

        {renderSelectButton("Select Time", selectedTime, () => openModal("time"))}
        {renderSelectButton("Select Doctor", selectedDoctor, () => openModal("doctor"))}
        {renderSelectButton("Select Appointment Type", selectedType, () => openModal("type"))}

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <View
            style={[
              styles.confirmButtonGradient,
              {
                backgroundColor: tintColor,
                elevation: 3,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              },
            ]}
          >
            <Ionicons name="checkmark-circle" size={24} color={backgroundColor} />
            <ThemedText style={styles.confirmButtonText}>Confirm Appointment</ThemedText>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor }]}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" size={24} color={textColor} />
            </TouchableOpacity>
            {renderModalContent()}
          </View>
        </View>
      </Modal>
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
  title: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
  },
  calendarContainer: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryContainer: {
    marginVertical: 20,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  summaryTitle: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  selectButtonText: {
    fontSize: 16,
  },
  confirmButton: {
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  confirmButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  confirmButtonText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "50%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(224, 224, 224, 0.5)",
  },
});

export default AppointmentScreen;
