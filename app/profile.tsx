import React, { useState, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, Image, TextInput, Alert, Switch, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

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
  const accentColor = useThemeColor({}, "accent");

  const handleLogout = useCallback(() => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: () => {
            router.replace("/auth");
          },
        },
      ],
      { cancelable: false }
    );
  }, []);

  const handleNavigateToSettings = useCallback(() => {
    router.push("/settings");
  }, []);

  const handleNavigateToNotifications = useCallback(() => {
    router.push("/notifications");
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
    console.log("Saving profile data:", { personalInfo, medicalHistory, notificationSettings });
    Alert.alert("Success", "Profile updated successfully!");
  }, [personalInfo, medicalHistory, notificationSettings]);

  const renderInput = useCallback(
    (label: string, value: string, onChangeText: (text: string) => void) => (
      <View style={styles.inputContainer}>
        <ThemedText style={styles.inputLabel}>{label}</ThemedText>
        <TextInput
          style={[styles.input, { color: textColor, borderColor: `${tintColor}50` }]}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={`${textColor}80`}
        />
      </View>
    ),
    [textColor, tintColor]
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <LinearGradient
        colors={[backgroundColor, `${tintColor}40`, `${accentColor}90`]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity style={[styles.headerButton, styles.logoutButton]} onPress={handleLogout}>
            <BlurView intensity={80} tint="light" style={styles.blurView}>
              <Ionicons name="log-out-outline" size={24} color={tintColor} />
            </BlurView>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, styles.settingsButton]} onPress={handleNavigateToSettings}>
            <BlurView intensity={80} tint="light" style={styles.blurView}>
              <Ionicons name="settings-outline" size={24} color={tintColor} />
            </BlurView>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, styles.notificationsButton]} onPress={handleNavigateToNotifications}>
            <BlurView intensity={80} tint="light" style={styles.blurView}>
              <Ionicons name="notifications-outline" size={24} color={tintColor} />
            </BlurView>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileImageContainer} onPress={handleImagePicker}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <LinearGradient colors={[tintColor, `${tintColor}40`]} style={styles.profileImagePlaceholder}>
                <Ionicons name="person-outline" size={40} color={backgroundColor} />
              </LinearGradient>
            )}
          </TouchableOpacity>
          <ThemedText style={styles.name}>{personalInfo.name}</ThemedText>
          <ThemedText style={styles.email}>{personalInfo.email}</ThemedText>
        </View>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Personal Information</ThemedText>
          {renderInput("Name", personalInfo.name, (text) => setPersonalInfo((prev) => ({ ...prev, name: text })))}
          {renderInput("Age", personalInfo.age, (text) => setPersonalInfo((prev) => ({ ...prev, age: text })))}
          {renderInput("Email", personalInfo.email, (text) => setPersonalInfo((prev) => ({ ...prev, email: text })))}
          {renderInput("Phone", personalInfo.phone, (text) => setPersonalInfo((prev) => ({ ...prev, phone: text })))}
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Medical History</ThemedText>
          {renderInput("Conditions", medicalHistory.conditions, (text) => setMedicalHistory((prev) => ({ ...prev, conditions: text })))}
          {renderInput("Medications", medicalHistory.medications, (text) => setMedicalHistory((prev) => ({ ...prev, medications: text })))}
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Notification Settings</ThemedText>
          <View style={styles.switchContainer}>
            <ThemedText>Appointment Reminders</ThemedText>
            <Switch
              value={notificationSettings.appointments}
              onValueChange={(value) => setNotificationSettings((prev) => ({ ...prev, appointments: value }))}
              trackColor={{ false: `${textColor}30`, true: tintColor }}
              thumbColor={notificationSettings.appointments ? accentColor : `${textColor}80`}
            />
          </View>
          <View style={styles.switchContainer}>
            <ThemedText>Medication Reminders</ThemedText>
            <Switch
              value={notificationSettings.medications}
              onValueChange={(value) => setNotificationSettings((prev) => ({ ...prev, medications: value }))}
              trackColor={{ false: `${textColor}30`, true: tintColor }}
              thumbColor={notificationSettings.medications ? accentColor : `${textColor}80`}
            />
          </View>
        </ThemedView>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <LinearGradient colors={[tintColor, `${tintColor}40`]} style={styles.saveButtonGradient}>
            <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
          </LinearGradient>
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
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
  },
  headerButton: {
    position: "absolute",
    top: 20,
    zIndex: 1,
  },
  logoutButton: {
    right: 20,
  },
  settingsButton: {
    left: 20,
  },
  notificationsButton: {
    left: 70,
  },
  blurView: {
    padding: 10,
    borderRadius: 20,
  },
  profileImageContainer: {
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
  name: {
    fontSize: 24,
    fontFamily: "Inter-Regular",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    opacity: 0.7,
  },
  section: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter-Regular",
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    fontFamily: "Inter-Regular",
  },
  saveButton: {
    marginHorizontal: 20,
    marginTop: 20,
    overflow: "hidden",
    borderRadius: 25,
    marginBottom: 40,
  },
  saveButtonGradient: {
    padding: 15,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Inter-Regular",
  },
});

export default PatientProfileScreen;
