import { useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import OptionGroup from "@/components/groupButtons/OptionGroup";
import BtnForm from "@/components/buttons/btnForm";
import { useQuestionStore } from "@/lib/stores/useFormDass";
import { useSensorLogger } from "@/lib/hooks/useSensorLogger";

export default function Question1() {
    const router = useRouter();

    const questionIndex = 0;

    useSensorLogger("DASS", questionIndex + 1 , "accelerometer");

    const {
        perguntas,
        setResposta,
        incrementaClique,
        setTempo,
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

    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        startTimeRef.current = Date.now();
    }, []);

    const handleNext = () => {
        const endTime = Date.now();
        const elapsedSeconds = Math.floor((endTime - startTimeRef.current) / 1000);
        setTempo(questionIndex, elapsedSeconds);

        router.replace("/(forms dass)/question2");
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
                onPress={handleNext}
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
