import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import OptionGroup from "@/components/groupButtons/OptionGroup";
import BtnForm from "@/components/buttons/btnForm";
import { useCapcStore } from "@/lib/stores/useFormCapc";
import { useSensorLoggerMobile } from "@/lib/hooks/useSensorLoggerMobile";
import { useSensorLoggerWeb } from "@/lib/hooks/useSensorLoggerWeb";
import { Platform } from "react-native";

export default function Question22() {
    const [ tempoRespostaRegistrado, setTempoRespostaRegistrado ] = useState(false);
    const router = useRouter();

    const {
        perguntas,
        setResposta,
        incrementaClique,
        setTempo,
        setTempoResposta,
    } = useCapcStore();

    const questionIndex = 21;
    const questionData = perguntas[questionIndex];

    useSensorLoggerWeb("CAPC", questionIndex + 1);
    useSensorLoggerMobile("CAPC", questionIndex + 1, "accelerometer");
    useSensorLoggerMobile("CAPC", questionIndex + 1, "gyroscope");

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

        router.replace("/(results)/resultGeneral");
    };

  const options = [
    { id: 1, label: "1 - Nunca" },
    { id: 2, label: "2 - Raramente" },
    { id: 3, label: "3 - Às vezes" },
    { id: 4, label: "4 - Frequentemente" },
    { id: 5, label: "5 - Sempre" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        22. Posso perder completamente a noção do tempo se trabalho intensivamente.
      </Text>

      <OptionGroup
        options={options}
        selected={questionData.resposta}
        onSelect={(id) => {
          handleAnswer(id);
        }}
      />

      <BtnForm
        title="Finalizar capc"
        onPress={handleNext}
        disabled={questionData.resposta === null}
        color="#3B82F6"
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