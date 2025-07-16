import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";

type Option<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  options: Option<T>[];
  value: T | null;
  onChange: (value: T) => void;
  label?: string;
  horizontal?: boolean;
};

export default function RadioGroup<T>({
  options,
  value,
  onChange,
  label,
  horizontal = false,
}: Props<T>) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.groupLabel}>{label}</Text>}

      <View
        style={[
          styles.optionsContainer,
          horizontal && { flexDirection: "row", flexWrap: "wrap" },
        ]}
      >
        {options.map((option, index) => {
          const selected = option.value === value;

          return (
            <TouchableOpacity
              key={String(option.value)}
              style={[
                styles.radioItem,
                horizontal && { marginRight: 20, marginBottom: 10 },
              ]}
              onPress={() => onChange(option.value)}
            >
              <View
                style={[
                  styles.radioCircle,
                  selected && styles.radioCircleSelected,
                ]}
              >
                {selected && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.radioLabel}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center", // mantém o label centralizado
  },
  groupLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#7189BC",
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "column",
    alignItems: "flex-start", // <- ALINHA OS ITENS À ESQUERDA
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#7189BC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioCircleSelected: {
    borderColor: "#0839A2",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#0839A2",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
  },
});