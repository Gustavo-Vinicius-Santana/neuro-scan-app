import { View, Text, StyleSheet } from "react-native";

export default function ResultFfmq() {
  const observacao = 20;
  const descricao = 18;
  const acaoConsciente = 22;
  const naoJulgamento = 19;
  const naoReatividade = 16;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado do FFMQ</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Observação:</Text>
        <Text style={styles.result}>{observacao} pontos</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.result}>{descricao} pontos</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Ação Consciente:</Text>
        <Text style={styles.result}>{acaoConsciente} pontos</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Não Julgamento:</Text>
        <Text style={styles.result}>{naoJulgamento} pontos</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Não Reatividade:</Text>
        <Text style={styles.result}>{naoReatividade} pontos</Text>
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