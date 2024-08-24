import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity, Switch, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

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

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const accentColor = useThemeColor({}, "accent");

  const animatedOffset = useSharedValue(100);

  useEffect(() => {
    animatedOffset.value = withSpring(0, { damping: 15 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedOffset.value }],
      opacity: 1 - animatedOffset.value / 100,
    };
  });

  const handleGoBack = useCallback(() => {
    router.back();
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
        },
      }))
    );
  }, [t, setLanguage]);

  const renderSettingsItem = useCallback(
    (icon: string, title: string, onPress: () => void, value?: string) => (
      <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
        <LinearGradient
          colors={[`${tintColor}20`, `${accentColor}20`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.settingsItemGradient}
        >
          <BlurView intensity={20} tint="light" style={styles.settingsItemContent}>
            <View style={styles.settingsItemLeft}>
              <Ionicons name={icon as any} size={24} color={tintColor} style={styles.settingsItemIcon} />
              <ThemedText style={styles.settingsItemTitle}>{title}</ThemedText>
            </View>
            {value ? (
              <ThemedText style={styles.settingsItemValue}>{value}</ThemedText>
            ) : (
              <Ionicons name="chevron-forward" size={24} color={textColor} />
            )}
          </BlurView>
        </LinearGradient>
      </TouchableOpacity>
    ),
    [tintColor, textColor, accentColor]
  );

  const renderNotificationToggle = useCallback(
    (title: string, key: keyof NotificationPreferences) => (
      <View style={styles.settingsItem}>
        <LinearGradient
          colors={[`${tintColor}20`, `${accentColor}20`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.settingsItemGradient}
        >
          <BlurView intensity={20} tint="light" style={styles.settingsItemContent}>
            <ThemedText style={styles.settingsItemTitle}>{title}</ThemedText>
            <Switch
              value={notificationPreferences[key]}
              onValueChange={() => handleToggleNotification(key)}
              trackColor={{ false: "#767577", true: tintColor }}
              thumbColor={notificationPreferences[key] ? accentColor : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
          </BlurView>
        </LinearGradient>
      </View>
    ),
    [notificationPreferences, tintColor, accentColor, handleToggleNotification]
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <LinearGradient
        colors={[backgroundColor, `${tintColor}40`, `${accentColor}40`]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color={tintColor} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>{t("settings")}</ThemedText>
      </View>
      <Animated.ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} style={animatedStyle}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Account Settings</ThemedText>
          {renderSettingsItem("key-outline", t("changePassword"), () => {})}
          {renderSettingsItem("mail-outline", t("updateEmail"), () => {})}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Notification Preferences</ThemedText>
          {renderNotificationToggle(t("appointments"), "appointments")}
          {renderNotificationToggle(t("productLaunches"), "productLaunches")}
          {renderNotificationToggle(t("promotions"), "promotions")}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>{t("language")}</ThemedText>
          {renderSettingsItem("language-outline", t("selectLanguage"), handleLanguageChange, selectedLanguage)}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Legal</ThemedText>
          {renderSettingsItem("document-text-outline", t("privacyPolicy"), () => {})}
          {renderSettingsItem("document-text-outline", t("termsOfService"), () => {})}
        </View>
      </Animated.ScrollView>
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
    paddingTop: 60,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Inter-Regular",
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter-Regular",
    fontWeight: "bold",
    marginBottom: 15,
    marginLeft: 10,
  },
  settingsItem: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
    fontFamily: "Inter-Regular",
  },
  settingsItemGradient: {
    borderRadius: 15,
  },
  settingsItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsItemIcon: {
    marginRight: 15,
  },
  settingsItemTitle: {
    fontSize: 18,
  },
  settingsItemValue: {
    fontSize: 16,
    opacity: 0.7,
  },
});

export default SettingsScreen;
