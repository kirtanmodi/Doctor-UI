import React from "react";
import { StyleSheet, View, TouchableOpacity, Modal, FlatList } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";

interface SelectionModalProps {
  visible: boolean;
  onClose: () => void;
  data: any[];
  onSelect: (item: any) => void;
  renderItem: (item: any) => React.ReactNode;
  backgroundColor: string;
  textColor: string;
}

const SelectionModal: React.FC<SelectionModalProps> = ({ visible, onClose, data, onSelect, renderItem, backgroundColor, textColor }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <BlurView intensity={90} tint="dark" style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-outline" size={28} color={textColor} />
          </TouchableOpacity>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id?.toString() || item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                {renderItem(item)}
              </TouchableOpacity>
            )}
          />
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 15,
    padding: 20,
    width: "80%",
    maxHeight: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
});

export default SelectionModal;
