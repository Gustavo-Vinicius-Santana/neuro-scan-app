import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { useRouter } from "expo-router";

import OptionGroup from "@/components/groupButtons/OptionGroup";
import BtnForm from "@/components/buttons/btnForm";
import { useSensorLoggerMobile } from "@/lib/hooks/useSensorLoggerMobile";
import { useSensorLoggerWeb } from "@/lib/hooks/useSensorLoggerWeb";

interface Question {
  text: string;
  options: { id: number; label: string }[];
}

interface QuestionnaireTemplateProps {
  questions: Question[];
  sensorKey: string;
  store: {
    respostas: { resposta: number | null }[];
    setResposta: (index: number, value: number) => void;
    incrementaClique: (index: number, value: number) => void;
    setTempo: (index: number, tempo: number) => void;
    setTempoResposta: (index: number, tempo: number) => void;
  };
  finishRoute: string;
}

// ✅ Hook auxiliar que encapsula a lógica de plataforma
function useSensorLogger(sensorKey: string, questionNumber: number) {
  if (Platform.OS === "web") {
    useSensorLoggerWeb(sensorKey, questionNumber);
  } else {
    useSensorLoggerMobile(sensorKey, questionNumber, "accelerometer");
    useSensorLoggerMobile(sensorKey, questionNumber, "gyroscope");
  }
}

export default function QuestionnaireTemplate({
  questions,
  sensorKey,
  store,
  finishRoute,
}: QuestionnaireTemplateProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tempoRespostaRegistrado, setTempoRespostaRegistrado] = useState(false);
  const startTime = useRef<number | null>(null);

  const current = questions[currentIndex];

  // ✅ Chamada segura do hook combinado
  useSensorLogger(sensorKey, currentIndex + 1);

  useEffect(() => {
    startTime.current = Date.now();
    setTempoRespostaRegistrado(false);
  }, [currentIndex]);

  const getElapsedSeconds = () => {
    if (!startTime.current) return 0;
    const ms = Date.now() - startTime.current;
    return Math.round((ms / 1000) * 100) / 100;
  };

  const handleAnswer = (id: number) => {
    const tempo = getElapsedSeconds();
    store.setResposta(currentIndex, id);

    if (!tempoRespostaRegistrado) {
      store.setTempoResposta(currentIndex, tempo);
      setTempoRespostaRegistrado(true);
    }

    store.incrementaClique(currentIndex, id);
  };

  const handleNext = () => {
    const tempo = getElapsedSeconds();
    store.setTempo(currentIndex, tempo);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.replace(finishRoute as any);
    }
  };

  const respostaAtual = store.respostas[currentIndex]?.resposta ?? null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ alignItems: "flex-start" }}>
        <Text style={{ color: "#0839A2", fontSize: 16 }}>
          PERGUNTA {currentIndex + 1} de {questions.length}
        </Text>
        <Text style={styles.question}>{current.text}</Text>
      </View>

      <OptionGroup
        options={current.options}
        selected={respostaAtual}
        onSelect={handleAnswer}
      />

      <BtnForm
        title={currentIndex === questions.length - 1 ? "Finalizar" : "Próximo"}
        color="#4F46E5"
        onPress={handleNext}
        disabled={respostaAtual === null}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#7189BC",
  },
});