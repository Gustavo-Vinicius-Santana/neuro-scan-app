import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Question2() {
    const router = useRouter();

    const handleAnswer = (value: number) => {
        // Aqui você pode salvar a resposta no estado global ou local,
        console.log("Resposta selecionada:", value);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>
                2. Senti minha boca seca?
            </Text>
            <TouchableOpacity
                style={styles.option}
                onPress={() => handleAnswer(0)}
            >
                <Text style={styles.optionText}>
                    0 - Não aconteceu comigo essa semana
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.option}
                onPress={() => handleAnswer(1)}
            >
                <Text style={styles.optionText}>
                    1 - Aconteceu comigo algumas vezes na semana
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.option}
                onPress={() => handleAnswer(2)}
            >
                <Text style={styles.optionText}>
                    2 - Aconteceu comigo boa parte da semana
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.option}
                onPress={() => handleAnswer(3)}
            >
                <Text style={styles.optionText}>
                    3 - Aconteceu comigo na maior parte do tempo essa semana
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => router.push("/(form ffmq)/welcome")}
            >
                <Text style={styles.nextButtonText}>finalizar dass 21</Text>
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
        backgroundColor: "#4F46E5",
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