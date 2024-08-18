import React, { useState, useCallback } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity, Image, TextInput, Alert, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

interface PersonalInfo {
  name: string;
  age: string;
  email: string;
  phone: string;
}

interface MedicalHistory {
  conditions: string;
  medications: string;
}

interface NotificationSettings {
  appointments: boolean;
  medications: boolean;
}

const PatientProfileScreen: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "John Doe",
    age: "30",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
  });

  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory>({
    conditions: "None",
    medications: "None",
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    appointments: true,
    medications: true,
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  const handleLogout = useCallback(() => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: () => {
            // Perform logout logic here
            router.replace("/auth");
          },
        },
      ],
      { cancelable: false }
    );
  }, []);

  const handleImagePicker = useCallback(async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to grant camera roll permissions to change your profile picture.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  }, []);

  const handleSave = useCallback(() => {
    // Here you would typically send the updated data to your backend
    console.log("Saving profile data:", { personalInfo, medicalHistory, notificationSettings });
    Alert.alert("Success", "Profile updated successfully!");
  }, [personalInfo, medicalHistory, notificationSettings]);

  const renderSection = useCallback(
    (title: string, children: React.ReactNode) => (
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
        {children}
      </ThemedView>
    ),
    []
  );

  const renderInput = useCallback(
    (label: string, value: string, onChangeText: (text: string) => void) => (
      <View style={styles.inputContainer}>
        <ThemedText style={styles.inputLabel}>{label}</ThemedText>
        <TextInput
          style={[styles.input, { color: textColor, borderColor: tintColor }]}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={textColor + "80"}
        />
      </View>
    ),
    [textColor, tintColor]
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={tintColor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileImageContainer} onPress={handleImagePicker}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profileImagePlaceholder, { backgroundColor: tintColor }]}>
              <Ionicons name="camera-outline" size={40} color={backgroundColor} />
            </View>
          )}
        </TouchableOpacity>

        {renderSection(
          "Personal Information",
          <>
            {renderInput("Name", personalInfo.name, (text) => setPersonalInfo((prev) => ({ ...prev, name: text })))}
            {renderInput("Age", personalInfo.age, (text) => setPersonalInfo((prev) => ({ ...prev, age: text })))}
            {renderInput("Email", personalInfo.email, (text) => setPersonalInfo((prev) => ({ ...prev, email: text })))}
            {renderInput("Phone", personalInfo.phone, (text) => setPersonalInfo((prev) => ({ ...prev, phone: text })))}
          </>
        )}

        {renderSection(
          "Medical History",
          <>
            {renderInput("Conditions", medicalHistory.conditions, (text) => setMedicalHistory((prev) => ({ ...prev, conditions: text })))}
            {renderInput("Medications", medicalHistory.medications, (text) => setMedicalHistory((prev) => ({ ...prev, medications: text })))}
          </>
        )}

        {renderSection(
          "Notification Settings",
          <>
            <View style={styles.switchContainer}>
              <ThemedText>Appointment Reminders</ThemedText>
              <Switch
                value={notificationSettings.appointments}
                onValueChange={(value) => setNotificationSettings((prev) => ({ ...prev, appointments: value }))}
                trackColor={{ false: "#767577", true: tintColor }}
                thumbColor={notificationSettings.appointments ? "#f4f3f4" : "#f4f3f4"}
              />
            </View>
            <View style={styles.switchContainer}>
              <ThemedText>Medication Reminders</ThemedText>
              <Switch
                value={notificationSettings.medications}
                onValueChange={(value) => setNotificationSettings((prev) => ({ ...prev, medications: value }))}
                trackColor={{ false: "#767577", true: tintColor }}
                thumbColor={notificationSettings.medications ? "#f4f3f4" : "#f4f3f4"}
              />
            </View>
          </>
        )}

        <TouchableOpacity style={[styles.saveButton, { backgroundColor: tintColor }]} onPress={handleSave}>
          <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
        </TouchableOpacity>
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
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  saveButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PatientProfileScreen;
