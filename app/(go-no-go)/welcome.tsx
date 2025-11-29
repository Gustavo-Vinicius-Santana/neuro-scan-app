import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Welcome() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Teste Go/No-Go</Text>

            <Text style={styles.description}>
                O Go/No-Go é um teste de atenção e controle inibitório. 
                Toque apenas quando o estímulo for válido (Go) e permaneça parado quando for inválido (No-Go).
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/(go-no-go)/test")}
            >
                <Text style={styles.buttonText}>Iniciar Teste</Text>
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
        lineHeight: 22,
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
