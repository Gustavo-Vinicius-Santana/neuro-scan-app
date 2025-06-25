import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function TermoParticipacao() {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Participação</Text>
                    <Text style={styles.paragraph}>
                        Após a leitura do documento e tendo minhas dúvidas esclarecidas pelos pesquisadores, eu concordo em participar deste estudo como voluntário.
                    </Text>

                    <Text style={styles.paragraph}>
                        Fui devidamente informado sobre os procedimentos, possíveis riscos e benefícios.
                    </Text>

                    <Text style={styles.paragraph}>
                        Entendo que posso retirar meu consentimento a qualquer momento sem penalidade.
                    </Text>
                </View>

                {/* Checkbox de aceitação */}
                <TouchableWithoutFeedback onPress={() => setIsChecked(!isChecked)}>
                    <View style={styles.checkboxContainer}>
                        <View style={[styles.checkbox, isChecked && styles.checked]}>
                            {isChecked && <Ionicons name="checkmark" size={16} color="#007BFF" />}
                        </View>
                        <Text style={styles.checkboxLabel}>Aceito participar da pesquisa</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <View style={{ alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity 
                    style={[styles.button, !isChecked && styles.buttonDisabled]} 
                    onPress={() => router.push("/termoSensores")}
                    disabled={!isChecked}
                >
                    <Text style={styles.buttonText}>Vamos lá</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f4f4f4",
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
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: "#007BFF",
        borderRadius: 4,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    checked: {
        backgroundColor: "rgba(0, 123, 255, 0.1)",
    },
    checkboxLabel: {
        fontSize: 16,
        color: "#333",
    },
    button: {
        width: 200,
        alignItems: "center",
        backgroundColor: "#0033A0",
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
    },
    buttonDisabled: {
        backgroundColor: "#cccccc",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});