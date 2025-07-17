import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Welcome() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao formulário DASS-21</Text>
            <Text style={styles.description}>
                O DASS-21 é um questionário utilizado para avaliar os níveis de depressão, ansiedade e estresse. 
                Ele contém 21 perguntas que ajudam a identificar o seu estado emocional atual.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/(forms dass)/questions")}
            >
                <Text style={styles.buttonText}>Iniciar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 40,
    },
    button: {
        backgroundColor: "#4F46E5",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});