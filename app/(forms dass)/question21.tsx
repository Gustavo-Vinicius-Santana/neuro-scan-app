import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import OptionGroup from "@/components/groupButtons/OptionGroup";
import BtnForm from "@/components/buttons/btnForm";
import { useEffect, useRef, useState } from "react";
import { useQuestionStore } from "@/lib/stores/useFormDass";
import { useSensorLoggerMobile } from "@/lib/hooks/useSensorLoggerMobile";
import { useSensorLoggerWeb } from "@/lib/hooks/useSensorLoggerWeb";
import { Platform } from "react-native";

export default function Question21() {
    const [ tempoRespostaRegistrado, setTempoRespostaRegistrado ] = useState(false);
    const router = useRouter();

    const {
        perguntas,
        setResposta,
        incrementaClique,
        setTempo,
        setTempoResposta,
    } = useQuestionStore();

    const questionIndex = 1;
    const questionData = perguntas[questionIndex];

    useSensorLoggerWeb("CAPC", questionIndex + 1);
    useSensorLoggerMobile("DASS", questionIndex + 1, "accelerometer");
    useSensorLoggerMobile("DASS", questionIndex + 1, "gyroscope");

    const startTime = useRef<number | null>(null);

    useEffect(() => {
        startTime.current = Date.now();
    }, []);

    const getElapsedSeconds = () => {
        if (!startTime.current) return 0;
        const ms = Date.now() - startTime.current;
        return Math.round((ms / 1000) * 100) / 100;
    };

    const handleAnswer = (value: number) => {
        const elapsedSeconds = getElapsedSeconds();

        setResposta(questionIndex, value);

        if (!tempoRespostaRegistrado) {
            setTempoResposta(questionIndex, elapsedSeconds);
            setTempoRespostaRegistrado(true);
            console.log("Tempo da resposta registrado (s):", elapsedSeconds);
        }

        incrementaClique(questionIndex, value);
    };

    const handleNext = () => {
        if (startTime.current === null) return;

        const elapsedSeconds = Math.floor((Date.now() - startTime.current) / 1000);
        setTempo(questionIndex, elapsedSeconds);

        router.replace("/(form ffmq)/welcome");
    };

    const options = [
        { id: 1, label: "1 - Não aconteceu comigo essa semana" },
        { id: 2, label: "2 - Aconteceu comigo algumas vezes na semana" },
        { id: 3, label: "3 - Aconteceu comigo boa parte da semana" },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.question}>
                21. Senti que a vida não tinha sentido.
            </Text>
            <OptionGroup
                options={options}
                selected={questionData.resposta}
                onSelect={(id) => {
                    handleAnswer(id);
                }}
            />

            <BtnForm
                title="Finalizar Dass-21"
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
        color: "#0056b3",
    },
});