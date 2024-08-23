import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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

const Home = () => {
  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");

  const { t } = useLanguage();

  return (
    <LinearGradient colors={[backgroundColor, tintColor + "20"]} style={styles.gradient}>
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Header t={t} />
          <QuickActions />
          <OfferCard />
          <FeaturedProducts />
          <EducationCard />
          <BottomButtons />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  gradient: {
    flex: 1,
  },
});

export default Home;
