import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from "react-native-reanimated";

interface AppointmentHeaderProps {
  animatedIndex: Animated.SharedValue<number>;
  tintColor: string;
}

const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({ animatedIndex, tintColor }) => {
  const animatedStyles = useAnimatedStyle(() => {
    const translateY = interpolate(animatedIndex.value, [0, 1], [0, -80], Extrapolate.CLAMP);

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View style={[styles.header, animatedStyles]}>
      <LinearGradient colors={[`${tintColor}10`]} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
      <ThemedText style={styles.title}>Schedule Appointment</ThemedText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },
});

export default AppointmentHeader;
