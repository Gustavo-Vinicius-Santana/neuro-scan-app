import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useFfmqStore } from "@/lib/stores/useFormFfmq";

export default function ResultFfmq() {
    const { perguntas } = useFfmqStore();

    const calcularPontuacao = (indices: number[]) => {
        return indices.reduce((sum, idx) => {
            const resposta = perguntas[idx]?.resposta ?? 0;
            return sum + resposta;
        }, 0);
    };

    const observacaoIndices = [0, 1, 2, 3, 4];
    const descricaoIndices = [5, 6, 7, 8, 9];
    const acaoConscienteIndices = [10, 11, 12, 13, 14];
    const naoJulgamentoIndices = [15, 16, 17, 18, 19];
    const naoReatividadeIndices = [20, 21, 22, 23, 24];

    const observacao = calcularPontuacao(observacaoIndices);
    const descricao = calcularPontuacao(descricaoIndices);
    const acaoConsciente = calcularPontuacao(acaoConscienteIndices);
    const naoJulgamento = calcularPontuacao(naoJulgamentoIndices);
    const naoReatividade = calcularPontuacao(naoReatividadeIndices);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resultado do FFMQ</Text>

            <View style={styles.resultsGrid}>
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
                            Tempo resposta: {pergunta.tempoResposta ? `${pergunta.tempoResposta} segundos` : "N/A"}
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
        width: "48%",
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