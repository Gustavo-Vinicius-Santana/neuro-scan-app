import { View, Text, TextInput, StyleSheet } from "react-native";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

type Props<T extends FieldValues> = {
  label: string;
  placeholder: string;
  name: FieldPath<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, FieldPath<T>>;
  iconName?: keyof typeof Ionicons.glyphMap;
};

export default function InputText<T extends FieldValues>({
  label,
  placeholder,
  name,
  control,
  rules,
  iconName,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.inputWrapper}>
            {iconName && (
              <Ionicons
                name={iconName}
                size={20}
                color="#3498db"
                style={styles.icon}
              />
            )}
            <TextInput
              style={[
                styles.input,
                error ? { borderColor: "red" } : {},
                iconName ? { paddingLeft: 40 } : {},
              ]}
              placeholder={placeholder}
              placeholderTextColor="#4a90e2"
              keyboardType="default"
              value={value}
              onChangeText={onChange}
            />
          </View>
          {error && (
            <Text style={styles.errorText}>
              {error.message || "Este campo é obrigatório"}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5a5a5a",
    marginBottom: 8,
  },
  inputWrapper: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: 15,
    top: 14,
    zIndex: 1,
  },
  input: {
    width: "100%",
    padding: 14,
    paddingLeft: 18,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  errorText: {
    marginTop: 6,
    color: "red",
    fontSize: 13,
  },
});