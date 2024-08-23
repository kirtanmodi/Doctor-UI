import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const Home = () => {
  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const { t } = useLanguage();

  const handleScheduleAppointment = () => {
    router.push("/appointment");
  };

  const handleVirtualConsultation = () => {
    router.push("/virtualConsultation");
  };

  const handleNavigateToNotifications = () => {
    router.push("/notifications");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground
          source={{
            uri: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?size=626&ext=jpg&ga=GA1.1.1494512934.1721340923&semt=ais_hybrid",
          }}
          style={styles.headerBackground}
        >
          <LinearGradient colors={["rgba(0,0,0,0.6)", "transparent"]} style={styles.headerGradient}>
            <View style={styles.header}>
              <View>
                <ThemedText style={styles.welcomeText}>{t("welcome")},</ThemedText>
                <ThemedText style={styles.patientName}>Sarah</ThemedText>
              </View>
              <TouchableOpacity style={styles.notificationsButton} onPress={handleNavigateToNotifications}>
                <BlurView intensity={80} tint="light" style={styles.blurView}>
                  <Ionicons name="notifications-outline" size={24} color={tintColor} />
                </BlurView>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleScheduleAppointment}>
            <LinearGradient
              colors={[tintColor, lightenColor(tintColor, 20)]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.actionButtonGradient}
            >
              <Ionicons name="calendar" size={24} color="white" />
              <ThemedText style={styles.actionButtonText}>Schedule Appointment</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleVirtualConsultation}>
            <LinearGradient
              colors={[tintColor, lightenColor(tintColor, 20)]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.actionButtonGradient}
            >
              <Ionicons name="videocam" size={24} color="white" />
              <ThemedText style={styles.actionButtonText}>Virtual Consultation</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.offerCard}>
          <Image
            source={{
              uri: "https://cdn11.bigcommerce.com/s-tbmjggiln3/images/stencil/original/image-manager/soothegroupsamplebanner-1000.jpg?t=1682636805&_gl=1*f79879*_ga*MTExNDE3ODg0OC4xNjA5ODc2Nzg5*_ga_WS2VZYPC6G*MTY4MjYzNjc2Ni4yMzQ4LjEuMTY4MjYzNjc4OC4zOC4wLjA.",
            }}
            style={styles.offerImage}
          />
          <View style={styles.offerContent}>
            <ThemedText style={styles.offerTitle}>Limited Time Offer</ThemedText>
            <ThemedText style={styles.offerDescription}>20% off on all skincare consultations this week!</ThemedText>
          </View>
        </View>

        <TouchableOpacity onPress={() => router.push("/products")}>
          <ThemedView style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Featured Products</ThemedText>
              <Ionicons name="arrow-forward" size={20} color={tintColor} />
            </View>
            <View style={styles.productList}>
              <View style={styles.productItem}>
                <Image
                  source={{
                    uri: "https://assets.ajio.com/medias/sys_master/root/20231012/Vpam/6527f327ddf779151936eb55/-473Wx593H-466699750-clear-MODEL6.jpg",
                  }}
                  style={styles.productImage}
                />
                <ThemedText style={styles.productName}>Advanced Hydrating Serum</ThemedText>
              </View>
              <View style={styles.productItem}>
                <Image
                  source={{
                    uri: "data:image/jpeg;base64,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",
                  }}
                  style={styles.productImage}
                />
                <ThemedText style={styles.productName}>Anti-Aging Night Cream</ThemedText>
              </View>
            </View>
          </ThemedView>
        </TouchableOpacity>

        <TouchableOpacity style={styles.educationCard} onPress={() => router.push("/educationalContent")}>
          <ImageBackground
            source={{
              uri: "data:image/jpeg;base64,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",
            }}
            style={styles.educationImage}
          >
            <LinearGradient colors={["rgba(0,0,0,0.7)", "transparent"]} style={styles.educationGradient}>
              <ThemedText style={styles.educationTitle}>Educational Content</ThemedText>
              <ThemedText style={styles.educationDescription}>Explore skincare tips and tutorials</ThemedText>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>

        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.bottomButton} onPress={() => router.push("/chatSupport")}>
            <Ionicons name="chatbubbles-outline" size={24} color={tintColor} />
            <ThemedText style={styles.bottomButtonText}>Chat Support</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton} onPress={() => router.push("/feedbackReviews")}>
            <Ionicons name="star-outline" size={24} color={tintColor} />
            <ThemedText style={styles.bottomButtonText}>Feedback & Reviews</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  headerBackground: {
    height: 200,
  },
  headerGradient: {
    flex: 1,
    justifyContent: "flex-end",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: "white",
    opacity: 0.9,
  },
  patientName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  notificationsButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  blurView: {
    padding: 10,
    borderRadius: 20,
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  actionButton: {
    width: "48%",
    borderRadius: 15,
    overflow: "hidden",
  },
  actionButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  actionButtonText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  offerCard: {
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  offerImage: {
    width: "100%",
    height: 150,
  },
  offerContent: {
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  offerDescription: {
    fontSize: 14,
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productItem: {
    alignItems: "center",
    width: "48%",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    textAlign: "center",
    fontSize: 14,
  },
  educationCard: {
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  educationImage: {
    width: "100%",
    height: 150,
  },
  educationGradient: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  educationTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  educationDescription: {
    color: "white",
    fontSize: 16,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 15,
    width: "48%",
  },
  bottomButtonText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
});

// Helper function to lighten a color
function lightenColor(color: string, amount: number): string {
  return color.replace(/^#/, "").replace(/../g, (color) => ("0" + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

export default Home;
