import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useCapcStore } from "@/store/useFormCapc";

export default function ResultCapc() {
    const { perguntas } = useCapcStore();

    const calcularPontuacao = (indices: number[]) => {
        return indices.reduce((sum, idx) => {
            const resposta = perguntas[idx]?.resposta ?? 0;
            return sum + resposta;
        }, 0);
    };

    const controleEmocionalIndices = [0, 1, 2, 3, 4];
    const planejamentoIndices = [5, 6, 7, 8, 9];
    const persistenciaIndices = [10, 11, 12, 13, 14];
    const autocontroleIndices = [15, 16, 17, 18, 19];

    const controleEmocional = calcularPontuacao(controleEmocionalIndices);
    const planejamento = calcularPontuacao(planejamentoIndices);
    const persistencia = calcularPontuacao(persistenciaIndices);
    const autocontrole = calcularPontuacao(autocontroleIndices);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resultado do CAPC</Text>

            <View style={styles.resultsGrid}>
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
            </View>

            <Text style={styles.subtitle}>Detalhes das Respostas:</Text>

            <ScrollView style={styles.scrollArea}>
                {perguntas.map((pergunta, index) => (
                    <View key={index} style={styles.responseCard}>
                        <Text style={styles.questionText}>
                            Pergunta {index + 1}
                        </Text>
                        <Text style={styles.detail}>
                            Resposta: {pergunta.resposta !== null ? pergunta.resposta : "Não respondido"}
                        </Text>
                        <Text style={styles.detail}>
                            Tempo: {pergunta.tempo ? `${pergunta.tempo} segundos` : "Não registrado"}
                        </Text>
                        <Text style={styles.detail}>
                            Clique Resposta 1: {pergunta.cliqueResposta1 ?? 0} vezes
                        </Text>
                        <Text style={styles.detail}>
                            Clique Resposta 2: {pergunta.cliqueResposta2 ?? 0} vezes
                        </Text>
                        <Text style={styles.detail}>
                            Clique Resposta 3: {pergunta.cliqueResposta3 ?? 0} vezes
                        </Text>
                    </View>
                ))}
            </ScrollView>
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
    subtitle: {
        fontSize: 20,
        fontWeight: "600",
        marginVertical: 15,
        color: "#444",
    },
    resultsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 15,
        width: "48%", // <== para caber dois por linha com espaço entre eles
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    scrollArea: {
    },
    responseCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
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
    questionText: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
        color: "#333",
    },
    detail: {
        fontSize: 14,
        color: "#555",
        marginBottom: 4,
    },
});