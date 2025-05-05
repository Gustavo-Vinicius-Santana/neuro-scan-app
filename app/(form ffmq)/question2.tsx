import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function FFMQQuestion2() {
    const router = useRouter();

    const handleAnswer = (value: number) => {
        // Aqui você pode salvar a resposta no estado global ou local
        console.log("Resposta selecionada:", value);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>
                2. Sou bom para encontrar palavras que descrevam os meus sentimentos.
            </Text>

            <TouchableOpacity
                style={styles.option}
                onPress={() => handleAnswer(1)}
            >
                <Text style={styles.optionText}>1 - Nunca</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.option}
                onPress={() => handleAnswer(2)}
            >
                <Text style={styles.optionText}>2 - Às vezes</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.option}
                onPress={() => handleAnswer(3)}
            >
                <Text style={styles.optionText}>3 - Não tenho certeza</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.option}
                onPress={() => handleAnswer(4)}
            >
                <Text style={styles.optionText}>4 - Normalmente verdadeiro</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.option}
                onPress={() => handleAnswer(5)}
            >
                <Text style={styles.optionText}>
                    5 - Quase sempre ou sempre verdadeiro
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => router.push("/(form capc)/welcome")}
            >
                <Text style={styles.nextButtonText}>Finalizar form capc</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    question: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
    },
    option: {
        backgroundColor: "#E5E7EB",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 15,
    },
    optionText: {
        fontSize: 16,
    },
    nextButton: {
        marginTop: 30,
        backgroundColor: "#10B981",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    nextButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});