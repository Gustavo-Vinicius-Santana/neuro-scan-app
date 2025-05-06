import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Welcome() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao formulário CAPC</Text>
            <Text style={styles.description}>
                O CAPC (Child and Adolescent Physical Capacity Questionnaire) é um questionário que avalia a capacidade física percebida por crianças e adolescentes, ajudando a entender melhor seu nível de atividade física e percepção corporal.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/question1")}
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
        backgroundColor: "#3B82F6",
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