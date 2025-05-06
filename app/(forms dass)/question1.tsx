import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import OptionGroup from "@/components/groupButtons/OptionGroup";

export default function Question1() {
    const router = useRouter();

    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const options = [
        { id: 0, label: "0 - Não aconteceu comigo essa semana" },
        { id: 1, label: "1 - Aconteceu comigo algumas vezes na semana" },
        { id: 2, label: "2 - Aconteceu comigo boa parte da semana" },
        { id: 3, label: "3 - Aconteceu comigo na maior parte do tempo essa semana" },
      ];

    const handleAnswer = (value: number) => {
        console.log("Resposta selecionada:", value);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>
                1. Achei difícil me acalmar essa semana?
            </Text>
            <OptionGroup
                options={options}
                selected={selectedOption}
                onSelect={(id) => setSelectedOption(id)}
            />


            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => router.push("/question2")}
            >
                <Text style={styles.nextButtonText}>Próxima</Text>
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