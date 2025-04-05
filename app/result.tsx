import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import useForm from "@/store/useForm";

export default function Result() {
  const { formData } = useForm();

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{formData.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Idade:</Text>
        <Text style={styles.value}>{formData.age}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{formData.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: "#555",
    fontWeight: "600",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    color: "#000",
  },
});