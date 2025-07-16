import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Select, { ISelectItem } from "rn-custom-select-dropdown";

type Props<T> = {
  items: Array<ISelectItem<T>>;
  value: ISelectItem<T> | null;
  onChange: (item: ISelectItem<T>) => void;
  placeholder?: string;
  label?: string;
};

export default function CustomSelectDropdown<T>({
  items,
  value,
  onChange,
  placeholder = "Selecione uma opção",
  label,
}: Props<T>) {
  return (
    <View style={styles.container}>
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
    marginBottom: 6,
    fontSize: 16,
    fontWeight: "500",
    color: "#7189BC",
  },
});