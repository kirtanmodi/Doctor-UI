import React, { useState, useCallback } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableOpacity, Animated } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const accentColor = useThemeColor({}, "accent");

  const [animation] = useState(new Animated.Value(0));

  const handleSubmit = () => {
    console.log(isLogin ? "Logging in" : "Signing up", email, password);
    router.replace("/home");
  };

  const toggleAuthMode = useCallback(() => {
    setIsLogin((prev) => !prev);
    Animated.timing(animation, {
      toValue: isLogin ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isLogin]);

  const buttonBackgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [tintColor, accentColor],
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <LinearGradient
        colors={[backgroundColor, `${tintColor}40`, `${accentColor}90`]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>
        <BlurView intensity={80} tint="light" style={styles.formContainer}>
          <Text style={[styles.title, { color: textColor }]}>{isLogin ? "Welcome Back" : "Create Account"}</Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" color={tintColor} />}
            style={styles.input}
            theme={{ colors: { primary: tintColor, text: textColor } }}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            left={<TextInput.Icon icon="lock" color={tintColor} />}
            style={styles.input}
            theme={{ colors: { primary: tintColor, text: textColor } }}
          />
          <Animated.View style={[styles.buttonContainer, { backgroundColor: buttonBackgroundColor }]}>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity onPress={toggleAuthMode} style={styles.switchButton}>
            <Text style={[styles.switchButtonText, { color: textColor }]}>
              {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>

          {/* Social buttons moved inside the BlurView */}
          <View style={styles.socialContainer}>
            <Text style={[styles.socialText, { color: textColor }]}>Or connect with</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: `${tintColor}40` }]}>
                <Ionicons name="logo-facebook" size={24} color={textColor} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: `${accentColor}40` }]}>
                <Ionicons name="logo-google" size={24} color={textColor} />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    fontFamily: "Inter-Regular",
  },
  formContainer: {
    padding: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  title: {
    fontSize: 25,
    fontFamily: "Inter-Regular",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "transparent",
  },
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Inter-Regular",
  },
  switchButton: {
    marginTop: 16,
    alignItems: "center",
    fontFamily: "Inter-Regular",
  },
  switchButtonText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  socialContainer: {
    alignItems: "center",
    marginBottom: 20,
    fontFamily: "Inter-Regular",
  },
  socialText: {
    marginBottom: 10,
    fontFamily: "Inter-Regular",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    fontFamily: "Inter-Regular",
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    fontFamily: "Inter-Regular",
  },
});
