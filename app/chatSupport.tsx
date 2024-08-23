import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";

interface Message {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
}

const ChatSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  useEffect(() => {
    // Simulating fetching previous conversations
    setMessages([{ id: "1", text: "Hello! How can I help you today?", sender: "support", timestamp: new Date() }]);
  }, []);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");

      // Simulating a response from support
      setTimeout(() => {
        const supportResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thank you for your message. A support agent will be with you shortly.",
          sender: "support",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, supportResponse]);
      }, 1000);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.sender === "user" ? styles.userMessage : styles.supportMessage]}>
      <ThemedText style={styles.messageText}>{item.text}</ThemedText>
      <ThemedText style={styles.timestamp}>{item.timestamp.toLocaleTimeString()}</ThemedText>
    </View>
  );

  const renderQuickLink = (title: string) => (
    <TouchableOpacity style={[styles.quickLink, { backgroundColor: tintColor }]}>
      <ThemedText style={[styles.quickLinkText, { color: backgroundColor }]}>{title}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ThemedText style={styles.title}>Chat Support</ThemedText>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <ThemedView style={styles.quickLinksContainer}>
        {renderQuickLink("FAQs")}
        {renderQuickLink("Operating Hours")}
        {renderQuickLink("Contact Info")}
      </ThemedView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: tintColor }]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor={textColor + "80"}
          />
          <TouchableOpacity style={[styles.sendButton, { backgroundColor: tintColor }]} onPress={sendMessage}>
            <Ionicons name="send" size={24} color={backgroundColor} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  messageList: {
    paddingHorizontal: 15,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  supportMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    alignSelf: "flex-end",
    marginTop: 5,
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  quickLinksContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  quickLink: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  quickLinkText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ChatSupport;
