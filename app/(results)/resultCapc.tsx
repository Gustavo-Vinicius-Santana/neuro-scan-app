import { View, Text, StyleSheet } from "react-native";

export default function ResultCapc() {
  // 🔧 Valores estáticos simulados
  const controleEmocional = 15;
  const planejamento = 12;
  const persistencia = 18;
  const autocontrole = 14;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado do CAPC</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Controle Emocional:</Text>
        <Text style={styles.result}>{controleEmocional} pontos</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Planejamento:</Text>
        <Text style={styles.result}>{planejamento} pontos</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Persistência:</Text>
        <Text style={styles.result}>{persistencia} pontos</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Autocontrole:</Text>
        <Text style={styles.result}>{autocontrole} pontos</Text>
      </View>

      <Text style={styles.note}>
        * Estes são dados simulados. Substitua pelos valores reais quando a coleta estiver implementada.
      </Text>
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
    fontSize: 18,
    color: "#555",
    fontWeight: "600",
    marginBottom: 4,
  },
  result: {
    fontSize: 22,
    color: "#4F46E5",
    fontWeight: "700",
    marginBottom: 6,
  },
  note: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
});