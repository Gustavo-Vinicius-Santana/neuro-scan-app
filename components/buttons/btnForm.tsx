import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

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
  color = "#0033A0",
}: ButtonProps) {
  return (
    <View style={{ alignItems: "center" }}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0033A0",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
    width: 250
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