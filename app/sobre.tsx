import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Sobre() {
    const router = useRouter();

    function handlePress() {
        router.replace("/formInicial");
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Neuro Scan</Text>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>O que é?</Text>
                <Text style={styles.paragraph}>
                    O Neuro Scan é um app criado para ajudar você a acompanhar e entender seus níveis de estresse de forma rápida e prática.
                    Ele usa formulários reconhecidos (CAPC, FFMQ e DASS) para avaliar seu bem-estar mental.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Por que usar?</Text>
                <Text style={styles.paragraph}>
                    Ao utilizar o Neuro Scan, você tem uma visão clara sobre seu estado emocional, podendo detectar sinais de estresse e ansiedade.
                    É uma ferramenta simples que incentiva o autocuidado e a saúde mental contínua.
                </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Vamos lá</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f4f4f4",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#2c3e50",
        marginBottom: 30,
        textAlign: "center",
    },
    card: {
        backgroundColor: "rgba(0, 123, 255, 0.15)",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#007BFF",
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        color: "#333",
        lineHeight: 22,
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});