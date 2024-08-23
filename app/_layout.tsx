import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { usePathname } from "expo-router";
import { LanguageProvider } from "@/context/LanguageContext";
import { BlurView } from "expo-blur";
import { View, StyleSheet } from "react-native";

export default function RootLayout() {
  const tintColor = useThemeColor({}, "tint");
  const backgroundColor = useThemeColor({}, "background");
  const tabIconDefault = useThemeColor({}, "tabIconDefault");

  return (
    <LanguageProvider>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            borderTopWidth: 0,
            height: 60,
            borderRadius: 30,
            paddingBottom: 0,
            overflow: "hidden",
          },
          tabBarBackground: () => <BlurView tint="dark" intensity={75} style={StyleSheet.absoluteFillObject} />,
          tabBarActiveTintColor: tintColor,
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
          tabBarShowLabel: false,
          tabBarItemStyle: {
            padding: 0,
            marginTop: 0,
            marginBottom: 0,
          },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="appointment"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="virtualConsultation"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                <Ionicons name="home" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                <Ionicons name="cart" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="beforeAfterGallery"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                <Ionicons name="images" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                <Ionicons name="person" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="chatSupport"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="educationalContent"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="auth"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="feedbackReviews"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                <Ionicons name="star" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  activeIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});
