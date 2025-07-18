import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface ISelectItem {
  label: string;
  value: string;
}

interface SearchDropdownProps {
  label?: string;
  data: ISelectItem[];
  placeholder?: string;
  searchPlaceholder?: string;
  onChange?: (item: ISelectItem | null) => void;
  width?: any;
}

export default function SearchDropdown({
  label,
  data,
  placeholder = "Selecione um item",
  searchPlaceholder = "Pesquisar...",
  onChange,
  width = "100%",
}: SearchDropdownProps) {
  const [value, setValue] = useState<string | null>(null);

  const selectedItem = data.find((item) => item.value === value) || null;

  const handleChange = (item: ISelectItem) => {
    setValue(item.value);
    if (onChange) onChange(item);
  };

  return (
    <View style={[styles.container, { width }]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Dropdown
        mode="modal"
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        value={value}
        onChange={handleChange}
        style={styles.dropdown}
        search
        selectedTextStyle={styles.selectedText}
        placeholderStyle={styles.placeholder}
        maxHeight={250}
        itemContainerStyle={styles.itemContainer}
        itemTextStyle={styles.itemText}
        activeColor="#e6f0ff"

        inputSearchStyle={styles.searchInput}
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
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  itemContainer: {
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  selectedText: {
    fontSize: 16,
    color: "#333",
  },
  placeholder: {
    fontSize: 16,
    color: "#999",
  },

  searchInput: {
    borderWidth: 0,
    backgroundColor: "#f5f5f5",
    height: 40,
    borderRadius: 8,
  },
});