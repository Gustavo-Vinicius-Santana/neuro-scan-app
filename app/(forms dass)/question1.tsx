import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import OptionGroup from "@/components/groupButtons/OptionGroup";
import BtnForm from "@/components/buttons/btnForm";
import { useQuestionStore } from "@/store/useFormDass";

export default function Question1() {
    const router = useRouter();

    const questionIndex = 0;

    const {
        perguntas,
        setResposta,
        incrementaClique,
    } = useQuestionStore();

    const questionData = perguntas[questionIndex];

    const options = [
        { id: 1, label: "1 - Não aconteceu comigo essa semana" },
        { id: 2, label: "2 - Aconteceu comigo algumas vezes na semana" },
        { id: 3, label: "3 - Aconteceu comigo boa parte da semana" },
    ];

    const handleAnswer = (value: number) => {
        setResposta(questionIndex, value);
        incrementaClique(questionIndex, value); 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>
                1. Achei difícil me acalmar essa semana?
            </Text>
            <OptionGroup
                options={options}
                selected={questionData.resposta}
                onSelect={(id) => {
                    handleAnswer(id);
                }}
            />

            <BtnForm
                title="Próximo"
                color="#4F46E5"
                onPress={() => router.push("/(forms dass)/question2")}
                disabled={questionData.resposta === null}
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