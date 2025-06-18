import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import OptionGroup from "@/components/groupButtons/OptionGroup";
import BtnForm from "@/components/buttons/btnForm";
import { useFfmqStore } from "@/lib/stores/useFormFfmq";
import { useEffect, useRef, useState } from "react";
import { useSensorLogger } from "@/lib/hooks/useSensorLogger";

export default function FfmqQuestion1() {
    const [ tempoRespostaRegistrado, setTempoRespostaRegistrado ] = useState(false);
    const router = useRouter();

    const {
        perguntas,
        setResposta,
        incrementaClique,
        setTempo,
        setTempoResposta,
    } = useFfmqStore();

    const questionIndex = 0;
    const questionData = perguntas[questionIndex];

    useSensorLogger("FFMQ", questionIndex + 1 , "accelerometer");
    useSensorLogger("FFMQ", questionIndex + 1 , "gyroscope");

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

        router.replace("/question2");
    };

    const options = [
      { id: 1, label: "1 - Nunca" },
      { id: 2, label: "2 - Às vezes" },
      { id: 3, label: "3 - Não tenho certeza" },
      { id: 4, label: "4 - Normalmente verdadeiro" },
      { id: 5, label: "5 - Quase sempre ou sempre verdadeiro" },
    ];

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        1. Quando estou caminhando, eu deliberadamente percebo as sensações do meu corpo em movimento.
      </Text>

      <OptionGroup
        options={options}
        selected={questionData.resposta}
        onSelect={(id) => {
          handleAnswer(id);
        }}
      />

      <BtnForm
        title="Próxima"
        color="#10B981"
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