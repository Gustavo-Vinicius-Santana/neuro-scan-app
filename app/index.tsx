import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Accelerometer } from 'expo-sensors';

import useForm from "@/store/useForm";

export default function Index() {
  const router = useRouter();
  const { setFormData } = useForm();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(200);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      setAcceleration({ x: x ?? 0, y: y ?? 0, z: z ?? 0 });
    });

    return () => subscription.remove();
  }, []);

  const { x, y, z } = acceleration;

  function handleSubmit() {
    const data = { name, age, email };
    setFormData(data);
    router.push("/(forms dass)/welcome");
  }

  return (
    <View style={styles.container}>
      {/* Adicionado estilo de largura total aqui */}
      <View style={{ width: "100%", maxWidth: 500 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor="#aaa"
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.input}
            placeholder="Your age"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            onChangeText={setAge}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Your email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>Aceleração X: {x.toFixed(3)}</Text>
        <Text>Aceleração Y: {y.toFixed(3)}</Text>
        <Text>Aceleração Z: {z.toFixed(3)}</Text>
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
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});