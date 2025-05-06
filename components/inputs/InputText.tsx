import { View, Text, TextInput, StyleSheet } from "react-native";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  placeholder: string;
  name: FieldPath<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, FieldPath<T>>;
};

export default function InputText<T extends FieldValues>({
  label,
  placeholder,
  name,
  control,
  rules,
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
          <TextInput
            style={[
              styles.input,
              error ? { borderColor: "red" } : {},
            ]}
            placeholder={placeholder}
            placeholderTextColor="#aaa"
            keyboardType="default"
            value={value}
            onChangeText={onChange}
          />
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
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  errorText: {
    marginTop: 5,
    color: "red",
    fontSize: 12,
  },
});