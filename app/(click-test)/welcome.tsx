import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Welcome() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Teste de Cliques</Text>

            <Text style={styles.description}>
                O teste de cliques mede sua velocidade, coordenação e resistência. 
                Toque na tela o máximo de vezes que conseguir durante 30 segundos.
            </Text>

            <View style={styles.targetsContainer}>
                <View style={styles.targetExample}>
                    <Text style={styles.targetLabel}>A</Text>
                </View>
                <View style={styles.targetExample}>
                    <Text style={styles.targetLabel}>B</Text>
                </View>
            </View>

            <Text style={styles.keyboardHint}>
                💻 No computador use as teclas A e D
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/(click-test)/test")}
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
        backgroundColor: "#F5F7FA", // leve contraste com branco puro
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#111", // mais forte que padrão
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 40,
        lineHeight: 22,
        color: "#333", // antes padrão (cinza claro demais)
    },
    button: {
        backgroundColor: "#4F46E5",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        elevation: 3, // dá leve destaque
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
    targetsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    targetExample: {
        width: 100,
        height: 100,
        backgroundColor: '#E8F4FD',
        borderWidth: 2,
        borderColor: '#005FCC',
        borderStyle: 'dashed',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    targetLabel: {
        fontSize: 32,
        fontWeight: '700',
        color: '#005FCC',
    },
    keyboardHint: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        fontStyle: 'italic',
    },
});
