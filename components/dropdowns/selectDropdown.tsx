import React, { useState } from "react";
import { StyleSheet, View, Text, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

// Mantendo a mesma interface ISelectItem da biblioteca antiga
export interface ISelectItem<T = any> {
  label: string;
  value: T;
}

type Props<T> = {
  items: Array<ISelectItem<T>>;
  value: ISelectItem<T> | null;
  onChange: (item: ISelectItem<T>) => void;
  placeholder?: string;
  label?: string;
  width?: any;
};

export default function CustomSelectDropdown<T>({
  items,
  value,
  onChange,
  placeholder = "Selecione uma opção",
  label,
  width = "100%",
}: Props<T>) {
  // Estado interno para compatibilidade com react-native-element-dropdown
  const [dropdownValue, setDropdownValue] = useState<T | null>(
    value?.value ?? null
  );

  // Atualiza o estado interno quando o valor externo muda
  React.useEffect(() => {
    setDropdownValue(value?.value ?? null);
  }, [value]);

  const handleChange = (item: ISelectItem<T>) => {
    setDropdownValue(item.value);
    onChange(item);
  };

  return (
    <View style={[styles.container, width ? { width } : undefined]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Dropdown
        data={items}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={dropdownValue}
        onChange={handleChange}
        style={styles.dropdown}
        selectedTextStyle={styles.selectedText}
        placeholderStyle={styles.placeholder}
        maxHeight={200} // Reduzido de 250 para 200
        itemContainerStyle={styles.itemContainer}
        itemTextStyle={styles.itemText}
        activeColor="#e6f0ff"
        containerStyle={styles.containerStyle}
       
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8, // Reduzido de 10 para 8
  },
  label: {
    marginBottom: 6, // Reduzido de 8 para 6
    fontSize: 14, // Reduzido de 16 para 14
    fontWeight: "600",
    color: "#7189BC",
  },
  dropdown: {
    height: 44, // Reduzido de 50 para 44
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6, // Reduzido de 8 para 6
    paddingHorizontal: 10, // Reduzido de 12 para 10
    backgroundColor: "#fff",
  },
  selectedText: {
    fontSize: 14, // Reduzido de 16 para 14
    color: "#333",
  },
  placeholder: {
    fontSize: 14, // Reduzido de 16 para 14
    color: "#999",
  },
  itemContainer: {
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 14, // Reduzido de 16 para 14
    color: "#333",
    paddingVertical: 6, // Reduzido de 8 para 6
  },
  containerStyle: {
    borderRadius: 6, // Reduzido de 8 para 6
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    marginTop: 2, // Reduzido de 4 para 2
  },
});