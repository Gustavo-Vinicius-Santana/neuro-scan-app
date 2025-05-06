import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  color?: string;
};

export default function BtnForm({
  title,
  onPress,
  disabled = false,
  color = "#007BFF",
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? "#A9A9A9" : color },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextDisabled: {
    color: "#D3D3D3",
  },
});