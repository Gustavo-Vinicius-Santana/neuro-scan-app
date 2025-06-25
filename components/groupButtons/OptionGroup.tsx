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
              isSelected && styles.optionSelected,
            ]}
            onPress={() => onSelect(option.id)}
          >
            <View style={styles.checkboxContainer}>
              <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                {isSelected && (
                  <Ionicons name="checkmark" size={12} color="#fff" />
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
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "rgba(0, 123, 255, 0.08)", // azul claro com opacidade
  },
  optionSelected: {
    backgroundColor: "rgba(0, 123, 255, 0.18)", // um pouco mais escuro ao selecionar
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#007BFF",
    borderRadius: 10, // circular
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#007BFF",
  },
  optionText: {
    fontSize: 16,
    color: "#0056b3", // azul mais escuro para o texto
    flexShrink: 1,
  },
});