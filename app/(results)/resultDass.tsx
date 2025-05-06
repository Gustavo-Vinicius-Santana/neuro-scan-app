import { View, Text, StyleSheet } from "react-native";
import { useQuestionStore } from "@/store/useFormDass";

export default function ResultDass() {
  const { perguntas } = useQuestionStore();

  const calcularPontuacao = (indices: number[]) =>
    indices.reduce((sum, idx) => {
      const resposta = perguntas[idx]?.resposta ?? 0;
      return sum + resposta;
    }, 0);

  const indicesDepressao = [2, 4, 9, 12, 15, 16, 20];
  const indicesAnsiedade = [1, 3, 6, 8, 14, 18, 19];
  const indicesEstresse = [0, 5, 7, 10, 11, 13, 17];

  const depressao = calcularPontuacao(indicesDepressao);
  const ansiedade = calcularPontuacao(indicesAnsiedade);
  const estresse = calcularPontuacao(indicesEstresse);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado do DASS-21</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Estresse:</Text>
        <Text style={styles.result}>{estresse} pontos</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Ansiedade:</Text>
        <Text style={styles.result}>{ansiedade} pontos</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Depressão:</Text>
        <Text style={styles.result}>{depressao} pontos</Text>
      </View>

      <Text style={styles.note}>
        * As pontuações variam de 0 a 21 para cada escala. Consulte um profissional para interpretação detalhada.
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