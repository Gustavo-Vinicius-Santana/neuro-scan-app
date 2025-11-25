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
              <Text 
                style={styles.optionText}
                numberOfLines={0} // Permite múltiplas linhas
                ellipsizeMode="tail" // Adiciona "..." se necessário
              >
                {option.label}
              </Text>
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
    alignItems: "flex-start", // Alinha ao topo para múltiplas linhas
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#DEE6F5",
  },
  optionSelected: {
    backgroundColor: "rgba(56, 60, 64, 0.18)",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start", // Alinha ao topo
    flex: 1, // Ocupa todo o espaço disponível
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#7189BC",
    borderRadius: 10,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 2, // Pequeno ajuste para alinhar com o texto
  },
  checkboxChecked: {
    backgroundColor: "#007BFF",
  },
  optionText: {
    fontSize: 16,
    color: "#7189BC",
    flexShrink: 1, // Permite encolher
    flexWrap: "wrap", // Permite quebra de linha
    flex: 1, // Ocupa o espaço restante
    fontWeight: "600",
  },
});