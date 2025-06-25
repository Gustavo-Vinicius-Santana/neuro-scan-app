import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Welcome() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao formulário FFMQ</Text>
            <Text style={styles.description}>
                O FFMQ (Five Facet Mindfulness Questionnaire) é um questionário que avalia cinco aspectos da atenção plena: observar, descrever, agir com consciência, não julgar e não reagir. Ele ajuda a compreender melhor sua prática de mindfulness e seus efeitos.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/(form ffmq)/question1")}
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
        backgroundColor: "#10B981",
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