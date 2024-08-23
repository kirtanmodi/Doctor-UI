import React, { useState, useCallback, useMemo } from "react";
import { ScrollView, StyleSheet, View, Alert, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import { useSharedValue } from "react-native-reanimated";
import { DateData } from "react-native-calendars";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import AppointmentHeader from "@/components/appointment/AppointmentHeader";
import AppointmentCalendar from "@/components/appointment/AppointmentCalendar";
import AppointmentSelections from "@/components/appointment/AppointmentSelections";
import AppointmentSummary from "@/components/appointment/AppointmentSummary";
import ConfirmButton from "@/components/appointment/ConfirmButton";
import SelectionModal from "@/components/appointment/SelectionModal";
import { BlurView } from "expo-blur";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
}

interface AppointmentType {
  id: number;
  name: string;
  icon: string;
}

const doctors: Doctor[] = [
  { id: 1, name: "Dr. Smith", specialty: "Dermatologist", image: "https://example.com/dr-smith.jpg" },
  { id: 2, name: "Dr. Johnson", specialty: "Plastic Surgeon", image: "https://example.com/dr-johnson.jpg" },
  { id: 3, name: "Dr. Williams", specialty: "Esthetician", image: "https://example.com/dr-williams.jpg" },
];

const appointmentTypes: AppointmentType[] = [
  { id: 1, name: "In-person Consultation", icon: "people" },
  { id: 2, name: "Virtual Consultation", icon: "videocam" },
];

const timeSlots: string[] = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const AppointmentScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedType, setSelectedType] = useState<AppointmentType | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<"doctor" | "type" | "time" | null>(null);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const accentColor = useThemeColor({}, "accent");

  const animatedIndex = useSharedValue(0);

  const handleConfirm = useCallback(() => {
    if (!selectedDate || !selectedDoctor || !selectedType || !selectedTime) {
      Alert.alert("Incomplete Information", "Please fill in all fields before confirming.");
      return;
    }

    console.log("Appointment confirmed:", { selectedDate, selectedDoctor, selectedType, selectedTime });
    router.push("/home");
  }, [selectedDate, selectedDoctor, selectedType, selectedTime]);

  const openModal = useCallback((content: "doctor" | "type" | "time") => {
    setModalContent(content);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setModalContent(null);
  }, []);

  const handleScroll = useCallback(
    (event: { nativeEvent: { contentOffset: { y: number } } }) => {
      const scrollY = event.nativeEvent.contentOffset.y;
      animatedIndex.value = scrollY > 50 ? 1 : 0;
    },
    [animatedIndex]
  );

  const markedDates = useMemo(() => {
    return {
      [selectedDate]: { selected: true, selectedColor: tintColor },
    };
  }, [selectedDate, tintColor]);

  const renderModalContent = useCallback(() => {
    switch (modalContent) {
      case "doctor":
        return (
          <SelectionModal
            visible={modalVisible}
            onClose={closeModal}
            data={doctors}
            onSelect={setSelectedDoctor}
            renderItem={(item: Doctor) => (
              <>
                <ThemedText style={styles.modalItemText}>{item.name}</ThemedText>
                <ThemedText style={styles.modalItemSubtext}>{item.specialty}</ThemedText>
              </>
            )}
            backgroundColor={backgroundColor}
            textColor={textColor}
          />
        );
      case "type":
        return (
          <SelectionModal
            visible={modalVisible}
            onClose={closeModal}
            data={appointmentTypes}
            onSelect={setSelectedType}
            renderItem={(item: AppointmentType) => (
              <>
                <Ionicons name={item.icon as any} size={24} color={tintColor} style={styles.modalItemIcon} />
                <ThemedText style={styles.modalItemText}>{item.name}</ThemedText>
              </>
            )}
            backgroundColor={backgroundColor}
            textColor={textColor}
          />
        );
      case "time":
        return (
          <SelectionModal
            visible={modalVisible}
            onClose={closeModal}
            data={timeSlots}
            onSelect={setSelectedTime}
            renderItem={(item: string) => <ThemedText style={styles.modalItemText}>{item}</ThemedText>}
            backgroundColor={backgroundColor}
            textColor={textColor}
          />
        );
      default:
        return null;
    }
  }, [modalContent, modalVisible, closeModal, backgroundColor, textColor, tintColor]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <LinearGradient
        colors={[backgroundColor, `${tintColor}20`, `${accentColor}40`]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <AppointmentHeader animatedIndex={animatedIndex} tintColor={tintColor} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16}>
        <AppointmentCalendar
          selectedDate={selectedDate}
          onDateSelect={(day: DateData) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          theme={{ backgroundColor, textColor, tintColor }}
        />
        <BlurView intensity={20} tint="light" style={styles.selectionContainer}>
          <AppointmentSelections
            selectedDoctor={selectedDoctor}
            selectedType={selectedType}
            selectedTime={selectedTime}
            onSelectDoctor={() => openModal("doctor")}
            onSelectType={() => openModal("type")}
            onSelectTime={() => openModal("time")}
            tintColor={tintColor}
            accentColor={accentColor}
          />
        </BlurView>

        <AppointmentSummary selectedDate={selectedDate} selectedDoctor={selectedDoctor} selectedType={selectedType} selectedTime={selectedTime} />
        <ConfirmButton onPress={handleConfirm} backgroundColor={backgroundColor} tintColor={tintColor} accentColor={accentColor} />
      </ScrollView>
      {renderModalContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  modalItemText: {
    fontSize: 16,
  },
  modalItemSubtext: {
    fontSize: 14,
    opacity: 0.7,
    marginLeft: 10,
  },
  modalItemIcon: {
    marginRight: 10,
  },
  selectionContainer: {
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default AppointmentScreen;
