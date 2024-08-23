import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity, Switch, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";

interface NotificationPreferences {
  appointments: boolean;
  productLaunches: boolean;
  promotions: boolean;
}

const languages = ["English", "Hindi"];

const SettingsScreen: React.FC = () => {
  const { t, setLanguage, language } = useLanguage();
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({
    appointments: true,
    productLaunches: true,
    promotions: false,
  });
  const [selectedLanguage, setSelectedLanguage] = useState(language === "en" ? "English" : "Hindi");

  useEffect(() => {
    setSelectedLanguage(language === "en" ? "English" : "Hindi");
  }, [language, setSelectedLanguage]);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  const handleGoBack = useCallback(() => {
    router.back();
  }, []);

  const handleChangePassword = useCallback(() => {
    // Implement change password logic here
    Alert.alert("Change Password", "Password change functionality to be implemented.");
  }, []);

  const handleUpdateEmail = useCallback(() => {
    // Implement update email logic here
    Alert.alert("Update Email", "Email update functionality to be implemented.");
  }, []);

  const handleToggleNotification = useCallback((key: keyof NotificationPreferences) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const handleLanguageChange = useCallback(() => {
    Alert.alert(
      t("language"),
      t("chooseLanguage"),
      languages.map((lang) => ({
        text: lang,
        onPress: () => {
          const newLang = lang === "English" ? "en" : "hi";
          setSelectedLanguage(lang);
          setLanguage(newLang);
          // Force re-render
          setNotificationPreferences((prev) => ({ ...prev }));
        },
      }))
    );
  }, [t, setLanguage, setNotificationPreferences]);

  const handleViewPrivacyPolicy = useCallback(() => {
    // Implement view privacy policy logic here
    Alert.alert("Privacy Policy", "Privacy policy to be displayed here.");
  }, []);

  const handleViewTermsOfService = useCallback(() => {
    // Implement view terms of service logic here
    Alert.alert("Terms of Service", "Terms of service to be displayed here.");
  }, []);

  const renderSettingsItem = useCallback(
    (icon: string, title: string, onPress: () => void, value?: string) => (
      <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
        <View style={styles.settingsItemLeft}>
          <Ionicons name={icon as any} size={24} color={tintColor} style={styles.settingsItemIcon} />
          <ThemedText style={styles.settingsItemTitle}>{title}</ThemedText>
        </View>
        {value ? <ThemedText style={styles.settingsItemValue}>{value}</ThemedText> : <Ionicons name="chevron-forward" size={24} color={textColor} />}
      </TouchableOpacity>
    ),
    [tintColor, textColor]
  );

  const renderNotificationToggle = useCallback(
    (title: string, key: keyof NotificationPreferences) => (
      <View style={styles.settingsItem}>
        <ThemedText style={styles.settingsItemTitle}>{title}</ThemedText>
        <Switch
          value={notificationPreferences[key]}
          onValueChange={() => handleToggleNotification(key)}
          trackColor={{ false: "#767577", true: tintColor }}
          thumbColor={notificationPreferences[key] ? "#f4f3f4" : "#f4f3f4"}
        />
      </View>
    ),
    [notificationPreferences, tintColor, handleToggleNotification]
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color={tintColor} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>{t("settings")}</ThemedText>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Account Settings</ThemedText>
          {renderSettingsItem("key-outline", t("changePassword"), handleChangePassword)}
          {renderSettingsItem("mail-outline", t("updateEmail"), handleUpdateEmail)}
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Notification Preferences</ThemedText>
          {renderNotificationToggle(t("appointments"), "appointments")}
          {renderNotificationToggle(t("productLaunches"), "productLaunches")}
          {renderNotificationToggle(t("promotions"), "promotions")}
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>{t("language")}</ThemedText>
          {renderSettingsItem("language-outline", t("selectLanguage"), handleLanguageChange, selectedLanguage)}
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Legal</ThemedText>
          {renderSettingsItem("document-text-outline", t("privacyPolicy"), handleViewPrivacyPolicy)}
          {renderSettingsItem("document-text-outline", t("termsOfService"), handleViewTermsOfService)}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsItemIcon: {
    marginRight: 10,
  },
  settingsItemTitle: {
    fontSize: 16,
  },
  settingsItemValue: {
    fontSize: 16,
    opacity: 0.7,
  },
});

export default SettingsScreen;
