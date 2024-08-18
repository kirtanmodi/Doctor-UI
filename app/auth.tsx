import React, { useState, useCallback } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { Button, TextInput, Text, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";

export default function Auth() {
  const deviceColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(deviceColorScheme === "dark");
  const colors = Colors[isDarkMode ? "dark" : "light"];
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const handleSubmit = () => {
    // Implement authentication logic here
    console.log(isLogin ? "Logging in" : "Signing up", email, password);
    // After successful login, navigate to the home screen
    if (isLogin) {
      router.replace("/home");
    } else {
      // Handle sign up logic
      console.log("Sign up logic here");
      // After successful sign up, you might want to automatically log in the user
      // and then navigate to the home screen
      router.replace("/home");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* <View style={styles.darkModeToggle}>
        <Text style={{ color: colors.text }}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View> */}
      <Text variant="headlineMedium" style={[styles.pageTitle, { color: colors.text }]}>
        {isLogin ? "Welcome Back" : "Create Account"}
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        left={<TextInput.Icon icon="email" />}
        style={[styles.input, { backgroundColor: colors.background }]}
        theme={{ colors: { primary: colors.tint } }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        left={<TextInput.Icon icon="lock" />}
        style={[styles.input, { backgroundColor: colors.background }]}
        theme={{ colors: { primary: colors.tint } }}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={[styles.button, { backgroundColor: colors.tint }]}
        labelStyle={[styles.buttonLabel, { color: colors.background }]}
      >
        {isLogin ? "Login" : "Sign Up"}
      </Button>

      <Button onPress={() => setIsLogin(!isLogin)} style={styles.switchButton} labelStyle={[styles.switchButtonLabel, { color: colors.tint }]}>
        {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
      </Button>

      <View style={styles.socialContainer}>
        <Text style={[styles.socialText, { color: colors.icon }]}>Or connect with:</Text>
        <View style={styles.socialButtons}>
          <Button mode="outlined" icon="facebook" style={[styles.socialButton, { borderColor: colors.icon }]} labelStyle={{ color: colors.text }}>
            Facebook
          </Button>
          <Button mode="outlined" icon="google" style={[styles.socialButton, { borderColor: colors.icon }]} labelStyle={{ color: colors.text }}>
            Google
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
  switchButton: {
    marginTop: 16,
  },
  switchButtonLabel: {},
  socialContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  socialText: {
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    marginHorizontal: 8,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  darkModeToggle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 16,
  },
});
