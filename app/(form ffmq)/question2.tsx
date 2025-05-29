import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import OptionGroup from "@/components/groupButtons/OptionGroup";
import BtnForm from "@/components/buttons/btnForm";
import { useFfmqStore } from "@/lib/stores/useFormFfmq";

export default function FFMQQuestion2() {
  const router = useRouter();
  const questionIndex = 1;

  const { perguntas, setResposta, incrementaClique, setTempo } = useFfmqStore();

  const questionData = perguntas[questionIndex];

  const options = [
    { id: 1, label: "1 - Nunca" },
    { id: 2, label: "2 - Às vezes" },
    { id: 3, label: "3 - Não tenho certeza" },
    { id: 4, label: "4 - Normalmente verdadeiro" },
    { id: 5, label: "5 - Quase sempre ou sempre verdadeiro" },
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
  
        router.replace("/(form capc)/welcome");
    };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        2. Sou bom para encontrar palavras que descrevam os meus sentimentos.
      </Text>

      <OptionGroup
        options={options}
        selected={questionData.resposta}
        onSelect={(id) => {
          handleAnswer(id);
        }}
      />

      <BtnForm
        title="Finalizar form capc"
        onPress={handleNext}
        disabled={questionData.resposta === null}
        color="#10B981"
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