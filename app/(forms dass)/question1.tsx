import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import OptionGroup from "@/components/groupButtons/OptionGroup";
import BtnForm from "@/components/buttons/btnForm";

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
                onSelect={(id) => {
                    setSelectedOption(id);
                    handleAnswer(id);
                }}
            />

            <BtnForm
                title="Próximo"
                color="#4F46E5"
                onPress={() => router.push("/(forms dass)/question2")}
                disabled={selectedOption === null}
            />
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
});