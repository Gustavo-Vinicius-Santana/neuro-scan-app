import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import useInicialForm from "@/store/useInicialForm";

export default function Result() {
  const router = useRouter();

  const { formData } = useInicialForm();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados</Text>

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

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {router.push("/resultDass")}}
        >
          <Text style={styles.buttonText}>Resultado do DASS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {router.push("/resultCapc")}}
        >
          <Text style={styles.buttonText}>Resultado do CAPC</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {router.push("/resultFfmq")}}
        >
          <Text style={styles.buttonText}>Resultado do FFMQ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
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
  button: {
    backgroundColor: "#4F46E5", // Cor do botão
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10, // Espaçamento entre os botões
  },
  buttonText: {
    color: "#fff", // Cor do texto do botão
    fontSize: 16,
    fontWeight: "600",
  },
});