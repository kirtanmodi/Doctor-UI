import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Notification {
  id: string;
  type: "appointment" | "medication" | "offer";
  title: string;
  message: string;
  date: Date;
  read: boolean;
}

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

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
    <TouchableOpacity
      style={[styles.notificationItem, { backgroundColor: item.read ? backgroundColor : tintColor + "20" }]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationIcon}>
        <Ionicons name={item.type === "appointment" ? "calendar" : item.type === "medication" ? "medical" : "pricetag"} size={24} color={tintColor} />
      </View>
      <View style={styles.notificationContent}>
        <ThemedText style={styles.notificationTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.notificationMessage}>{item.message}</ThemedText>
        <ThemedText style={styles.notificationDate}>{item.date.toLocaleDateString()}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ThemedText style={styles.title}>Notifications</ThemedText>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  notificationList: {
    paddingHorizontal: 15,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationIcon: {
    marginRight: 15,
    justifyContent: "center",
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 16,
    marginBottom: 5,
  },
  notificationDate: {
    fontSize: 12,
    opacity: 0.7,
  },
});

export default NotificationsScreen;
