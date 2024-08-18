import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, TextInput, Alert, ActivityIndicator, SafeAreaView } from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../components/ThemedText";

const VirtualConsultation: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [consultationNotes, setConsultationNotes] = useState("");
  const [prescription, setPrescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const videoRef = useRef<Video>(null);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleStartCall = async () => {
    if (hasPermission === null) {
      Alert.alert("Permission not determined", "Please grant camera and microphone permissions.");
      return;
    }
    if (hasPermission === false) {
      Alert.alert("Permission denied", "Please enable camera and microphone permissions in your device settings.");
      return;
    }

    setIsLoading(true);
    try {
      // Simulating API call to start the call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsCallActive(true);
    } catch (error) {
      Alert.alert("Error", "Failed to start the call. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    // Reset states
    setIsMuted(false);
    setIsVideoEnabled(true);
    setConsultationNotes("");
    setPrescription("");
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Implement actual mute functionality here
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    // Implement actual video toggle functionality here
  };

  const handleSaveNotes = () => {
    // Implement saving notes functionality here
    Alert.alert("Success", "Consultation notes saved successfully.");
  };

  const handleSavePrescription = () => {
    // Implement saving prescription functionality here
    Alert.alert("Success", "Prescription saved successfully.");
  };

  if (hasPermission === null) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <ActivityIndicator size="large" color={tintColor} />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <ThemedText style={styles.errorText}>Camera and microphone permissions not granted</ThemedText>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.videoContainer}>
        {isCallActive ? (
          <Video
            ref={videoRef}
            style={styles.video}
            source={{ uri: "https://example.com/live-stream" }} // Replace with actual stream URL
            useNativeControls={false}
            // resizeMode="cover"
            isLooping
            shouldPlay
          />
        ) : (
          <View style={[styles.placeholderVideo, { backgroundColor: tintColor }]}>
            <Ionicons name="videocam" size={64} color={backgroundColor} />
          </View>
        )}
      </View>

      <View style={styles.controlsContainer}>
        {isCallActive ? (
          <>
            <TouchableOpacity style={[styles.controlButton, { backgroundColor: isMuted ? tintColor : "transparent" }]} onPress={toggleMute}>
              <Ionicons name={isMuted ? "mic-off" : "mic"} size={24} color={isMuted ? backgroundColor : tintColor} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, { backgroundColor: "red" }]} onPress={handleEndCall}>
              <Ionicons name="call" size={24} color={backgroundColor} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, { backgroundColor: isVideoEnabled ? "transparent" : tintColor }]} onPress={toggleVideo}>
              <Ionicons name={isVideoEnabled ? "videocam" : "videocam-off"} size={24} color={isVideoEnabled ? tintColor : backgroundColor} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={[styles.startCallButton, { backgroundColor: tintColor }]} onPress={handleStartCall} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color={backgroundColor} />
            ) : (
              <>
                <Ionicons name="call" size={24} color={backgroundColor} />
                <ThemedText style={[styles.startCallText, { color: backgroundColor }]}>Start Call</ThemedText>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>

      {isCallActive && (
        <View style={styles.notesContainer}>
          <TextInput
            style={[styles.notesInput, { color: textColor, borderColor: tintColor }]}
            placeholder="Consultation Notes"
            placeholderTextColor={textColor + "80"}
            multiline
            value={consultationNotes}
            onChangeText={setConsultationNotes}
          />
          <TouchableOpacity style={[styles.saveButton, { backgroundColor: tintColor }]} onPress={handleSaveNotes}>
            <ThemedText style={[styles.saveButtonText, { color: backgroundColor }]}>Save Notes</ThemedText>
          </TouchableOpacity>

          <TextInput
            style={[styles.notesInput, { color: textColor, borderColor: tintColor }]}
            placeholder="Prescription & Recommendations"
            placeholderTextColor={textColor + "80"}
            multiline
            value={prescription}
            onChangeText={setPrescription}
          />
          <TouchableOpacity style={[styles.saveButton, { backgroundColor: tintColor }]} onPress={handleSavePrescription}>
            <ThemedText style={[styles.saveButtonText, { color: backgroundColor }]}>Save Prescription</ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  placeholderVideo: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },
  startCallButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  startCallText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  notesContainer: {
    padding: 20,
  },
  notesInput: {
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  saveButtonText: {
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
  },
});

export default VirtualConsultation;
