import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Alert } from "react-native";
import { useRouter } from "expo-router";

import OptionGroup from "@/components/groupButtons/OptionGroup";
import BtnForm from "@/components/buttons/btnForm";
import { useSensorLoggerMobile } from "@/lib/hooks/useSensorLoggerMobile";
import { useSensorLoggerWeb } from "@/lib/hooks/useSensorLoggerWeb";
import { useRequest } from "@/lib/hooks/useRequest";
import { useAccelerometerWeb, useGyroscopeWeb } from "@/lib/hooks/useSampleSensor";

interface Question {
  text: string;
  options: { id: number; label: string }[];
}

interface QuestionnaireTemplateProps {
  questions: Question[];
  sensorKey: string;
  store: {
    respostas: any;
    setResposta: (index: number, value: number) => void;
    incrementaClique: (index: number, value: number) => void;
    setTempo: (index: number, tempo: number) => void;
    setTempoResposta: (index: number, tempo: number) => void;
  };
  finishRoute: string;
  endpoint?: string;
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
  endpoint,
}: QuestionnaireTemplateProps) {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [tempoRespostaRegistrado, setTempoRespostaRegistrado] = useState(false);
  const [startTime, setStartTime] = useState<Date>(new Date());

  // 🔥 hooks dos sensores web com start/pause
  const { samples: accelerometerSamples, start: startAccel, pause: pauseAccel } =
    useAccelerometerWeb(currentIndex);
  const { samples: gyroscopeSamples, start: startGyro, pause: pauseGyro } =
    useGyroscopeWeb(currentIndex);

  const { post, loading } = useRequest();
  const current = questions[currentIndex];

  // Chamada de hooks de sensores (mobile/web logger)
  useSensorLogger(sensorKey, currentIndex + 1);

  // Atualiza a data de início ao mudar a pergunta
  useEffect(() => {
    setStartTime(new Date());
    setTempoRespostaRegistrado(false);

    // ⚡️ start dos sensores ao mudar de pergunta/tela
    startAccel();
    startGyro();
  }, [currentIndex]);

  const getElapsedSeconds = () => {
    const ms = new Date().getTime() - startTime.getTime();
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

  const respostaAtual = store.respostas[currentIndex]?.resposta ?? null;

  const handleNext = async () => {
    const tempo = getElapsedSeconds();
    store.setTempo(currentIndex, tempo);

    try {
      // ⚡️ Pausa os sensores antes de enviar
      pauseAccel();
      pauseGyro();

      const r = store.respostas[currentIndex];

      const dados_sensores = accelerometerSamples.map((acc, i) => {
        const gyro = gyroscopeSamples[i] || {
          eixo_x: 0,
          eixo_y: 0,
          eixo_z: 0,
          timestamp: acc.timestamp,
        };

        return {
          timestamp: acc.timestamp,
          acelerometro: {
            eixo_x: acc.eixo_x,
            eixo_y: acc.eixo_y,
            eixo_z: acc.eixo_z,
          },
          giroscopio: {
            eixo_x: gyro.eixo_x,
            eixo_y: gyro.eixo_y,
            eixo_z: gyro.eixo_z,
          },
        };
      });

      const payload = {
        usuario_id: 1,
        pergunta_id: currentIndex + 1,
        resposta: r.resposta,
        duracao: r.tempo,
        idle: r.tempoResposta,
        quantidade_cliques:
          r.cliqueResposta1 + r.cliqueResposta2 + r.cliqueResposta3 + r.cliqueResposta4,
        quantidade_passos: 0,
        dh_inicio: startTime.toISOString(),
        dh_fim: new Date().toISOString(),
        dados_sensores,
      };

      console.log("Payload enviado:", payload);

      await post(`${endpoint}`, payload);

      console.log(`Resposta da pergunta ${currentIndex + 1} enviada com sucesso.`);
    } catch (err: any) {
      Alert.alert("Erro", err.message || "Falha ao enviar respostas");
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.replace(finishRoute as any);
    }
  };

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
        title={
          currentIndex === questions.length - 1
            ? loading
              ? "Enviando..."
              : "Finalizar"
            : "Próximo"
        }
        color="#4F46E5"
        onPress={handleNext}
        disabled={respostaAtual === null || loading}
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
