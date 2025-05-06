import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Option = {
  id: number;
  label: string;
};

type Props = {
  options: Option[];
  selected: number | null;
  onSelect: (id: number) => void;
};

export default function OptionGroup({ options, selected, onSelect }: Props) {
  return (
    <View>
      {options.map((option) => {
        const isSelected = selected === option.id;
        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              isSelected ? styles.optionSelected : {},
            ]}
            onPress={() => onSelect(option.id)}
          >
            <View style={styles.checkboxContainer}>
              <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                {isSelected && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
              <Text style={styles.optionText}>{option.label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  optionSelected: {
    borderColor: "#007BFF",
    backgroundColor: "#e6f0ff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    flexShrink: 1,
  },
});