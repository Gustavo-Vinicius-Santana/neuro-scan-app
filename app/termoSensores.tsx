import { useState } from "react";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Sensor = require("../assets/images/appImages/sensor_icon.png");

export default function TermoSensores() {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <View style={styles.card}>
                    <View style={styles.logo}>
                        <Image source={Sensor} />
                    </View>

                    <Text style={styles.paragraph}>
                        Para uma experiência mais imersiva e funcionalidades que se adaptam ao seu movimento, precisamos de um sensor de movimento.
                    </Text>

                    <Text style={styles.paragraph}>
                        Ao clicar em "aceito", você nos autoriza a usar essa tecnologia.
                    </Text>
                </View>

                {/* Checkbox de aceitação */}
                <TouchableWithoutFeedback onPress={() => setIsChecked(!isChecked)}>
                    <View style={styles.checkboxContainer}>
                        <View style={[styles.checkbox, isChecked && styles.checked]}>
                            {isChecked && <Ionicons name="checkmark" size={16} color="#007BFF" />}
                        </View>
                        <Text style={styles.checkboxLabel}>Aceito o uso de sensores</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <View style={{ alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity 
                    style={[styles.button, !isChecked && styles.buttonDisabled]} 
                    onPress={() => router.push("/formInicial")}
                    disabled={!isChecked}
                >
                    <Text style={styles.buttonText}>Próximo</Text>
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
        padding: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#007BFF",
        marginBottom: 10,
    },
    logo: {
        marginTop: 40,
        alignSelf: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        textTransform: "uppercase",
    },
    paragraph: {
        fontSize: 16,
        color: "#7189BC",
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
        backgroundColor: "#0033A0",
        padding: 15,
        borderRadius: 28,
        alignItems: "center",
        marginTop: 30,
        width: "25%",
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