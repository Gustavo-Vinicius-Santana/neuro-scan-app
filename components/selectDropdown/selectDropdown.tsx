import React from "react";
import { StyleSheet, View, Text, ViewStyle } from "react-native";
import Select, { ISelectItem } from "rn-custom-select-dropdown";

type Props<T> = {
  items: Array<ISelectItem<T>>;
  value: ISelectItem<T> | null;
  onChange: (item: ISelectItem<T>) => void;
  placeholder?: string;
  label?: string;
  width?: any; // ← nova prop
};

export default function CustomSelectDropdown<T>({
  items,
  value,
  onChange,
  placeholder = "Selecione uma opção",
  label,
  width = "100%",
}: Props<T>) {
  return (
    <View style={[styles.container, width ? { width } : undefined]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Select
        data={items}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#7189BC",
  },
});