import React, { useRef } from "react";
import { StyleSheet, View, Animated, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/home/Header";
import { QuickActions } from "@/components/home/QuickActions";
import { OfferCard } from "@/components/home/OfferCard";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { EducationCard } from "@/components/home/EducationCard";
import { BottomButtons } from "@/components/home/BottomButtons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";

const Home = () => {
  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");
  const accentColor = useThemeColor({}, "accent");
  const { t } = useLanguage();

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const renderFloatingButton = () => (
    <TouchableOpacity style={styles.floatingButton}>
      <BlurView intensity={80} tint="light" style={styles.blurView}>
        <Ionicons name="add" size={30} color={tintColor} />
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[backgroundColor, `${tintColor}40`, `${accentColor}90`]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <Header t={t} />
        </Animated.View>
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          scrollEventThrottle={16}
        >
          <View style={styles.content}>
            <QuickActions />
            <OfferCard />
            <FeaturedProducts />
            <EducationCard />
            <BottomButtons />
          </View>
        </Animated.ScrollView>
        {renderFloatingButton()}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  scrollContent: {
    paddingTop: 120,
    paddingBottom: 100,
  },
  content: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    zIndex: 10,
  },
  blurView: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default Home;
