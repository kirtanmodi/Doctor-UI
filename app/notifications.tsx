import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface Notification {
  id: string;
  type: "appointment" | "medication" | "offer";
  title: string;
  message: string;
  date: Date;
  read: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const accentColor = useThemeColor({}, "accent");

  useEffect(() => {
    // Fetch notifications from API or load from local storage
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "appointment",
        title: "Upcoming Appointment",
        message: "You have an appointment with Dr. Smith tomorrow at 2:00 PM.",
        date: new Date(),
        read: false,
      },
      {
        id: "2",
        type: "medication",
        title: "Medication Reminder",
        message: "It's time to take your evening medication.",
        date: new Date(),
        read: true,
      },
      {
        id: "3",
        type: "offer",
        title: "Special Offer",
        message: "20% off on all skincare products this week!",
        date: new Date(),
        read: false,
      },
    ];
    setNotifications(mockNotifications);
  }, []);

  const handleNotificationPress = (notification: Notification) => {
    // Mark notification as read
    setNotifications((prevNotifications) => prevNotifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)));

    // Navigate to relevant screen based on notification type
    switch (notification.type) {
      case "appointment":
        router.push("/appointment");
        break;
      case "medication":
        router.push("/medication");
        break;
      case "offer":
        router.push("/products");
        break;
    }
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
      <TouchableOpacity
        style={[styles.notificationItem, { backgroundColor: item.read ? `${backgroundColor}80` : `${tintColor}20` }]}
        onPress={() => handleNotificationPress(item)}
      >
        <BlurView intensity={80} tint="light" style={styles.iconContainer}>
          <Ionicons
            name={item.type === "appointment" ? "calendar" : item.type === "medication" ? "medical" : "pricetag"}
            size={24}
            color={tintColor}
          />
        </BlurView>
        <View style={styles.notificationContent}>
          <ThemedText style={styles.notificationTitle}>{item.title}</ThemedText>
          <ThemedText style={styles.notificationMessage}>{item.message}</ThemedText>
          <ThemedText style={styles.notificationDate}>
            {item.date.toLocaleDateString()} • {item.date.toLocaleTimeString()}
          </ThemedText>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <LinearGradient
        colors={[backgroundColor, `${tintColor}20`, `${accentColor}40`]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <ThemedText style={styles.title}>Notifications</ThemedText>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontFamily: "Inter-Regular",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  notificationList: {
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    fontWeight: "bold",
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginBottom: 5,
    opacity: 0.8,
  },
  notificationDate: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    opacity: 0.6,
  },
});

export default NotificationsScreen;
