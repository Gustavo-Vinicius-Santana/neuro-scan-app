import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import OptionGroup from "@/components/groupButtons/OptionGroup";
import BtnForm from "@/components/buttons/btnForm";
import { useCapcStore } from "@/lib/stores/useFormCapc";

export default function CAPCQuestion1() {
  const router = useRouter();

  const questionIndex = 0;

  const { perguntas, setResposta, incrementaClique, setTempo } = useCapcStore();

  const questionData = perguntas[questionIndex];

  const options = [
    { id: 1, label: "1 - Nunca" },
    { id: 2, label: "2 - Raramente" },
    { id: 3, label: "3 - Às vezes" },
    { id: 4, label: "4 - Frequentemente" },
    { id: 5, label: "5 - Sempre" },
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

      router.push("/question2");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        1. Eu consigo soluções para problemas através dos meus sonhos.
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
        onPress={handleNext}
        disabled={questionData === null}
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
  },
});