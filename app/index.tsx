import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

    const handleStart = () => {
        router.push("/formInicial");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>NEURO SCAN</Text>
            <Text style={styles.subtitle}>Bem-vindo ao seu app de monitoramento neural</Text>
            <TouchableOpacity style={styles.button} onPress={handleStart}>
                <Text style={styles.buttonText}>Começar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f8",
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#2c3e50",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#7f8c8d",
        textAlign: "center",
        marginBottom: 30,
    },
    button: {
        backgroundColor: "#007BFF",
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