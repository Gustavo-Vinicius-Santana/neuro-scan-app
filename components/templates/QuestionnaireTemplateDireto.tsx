import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Alert } from "react-native";
import { useRouter } from "expo-router";

import OptionGroup from "@/components/groupButtons/OptionGroup";
import BtnForm from "@/components/buttons/btnForm";

import { useSensorLoggerMobile } from "@/lib/hooks/useSensorLoggerMobile";
import { useAccelerometerWeb, useGyroscopeWeb } from "@/lib/hooks/useSampleSensor";

import { useRequest } from "@/lib/hooks/useRequest";
import { useUserStore } from "@/lib/stores/useUserStore";

interface Question {
  text: string;
  options: { id: number; label: string }[];
}

interface QuestionnaireTemplateProps {
  initialId: number;
  questions: Question[];
  sensorKey: string;
  store: {
    respostas: any;
    setResposta: (index: number, value: number) => void;
    incrementaClique: (index: number, value: number) => void;
    setTempo: (index: number, tempo: number) => void;
    setTempoResposta: (index: number, tempo: number) => void;
    resetResposta: (index: number, fullReset?: boolean) => void;
  };
  finishRoute: string;
  endpoint?: string;
}

export default function QuestionnaireTemplateDireto({
  questions,
  initialId,
  sensorKey,
  store,
  finishRoute,
  endpoint,
}: QuestionnaireTemplateProps) {
  const router = useRouter();

  const { user } = useUserStore();

  const [currentIndex, setCurrentIndex] = useState(0);

  // Controle de duração - usando useRef para valores que não trigger re-render
  const [tempoRespostaRegistrado, setTempoRespostaRegistrado] = useState(false);
  const startTimeRef = useRef<number>(0);
  const questionStartTimeRef = useRef<number>(0);

  // WEB SENSORS
  const {
    samples: accelerometerSamples,
    start: startAccel,
    pause: pauseAccel,
    clear: clearAccel,
  } = useAccelerometerWeb(currentIndex);

  const {
    samples: gyroscopeSamples,
    start: startGyro,
    pause: pauseGyro,
    clear: clearGyro,
  } = useGyroscopeWeb(currentIndex);

  const { loading } = useRequest();
  const current = questions[currentIndex];

  // MOBILE sensors
  useSensorLoggerMobile(sensorKey, currentIndex + 1, "accelerometer");
  useSensorLoggerMobile(sensorKey, currentIndex + 1, "gyroscope");

  // -----------------------------------------------------------
  // INICIAR NOVA PERGUNTA
  // -----------------------------------------------------------
  const startNewQuestion = () => {
    // Reset dos estados de controle
    setTempoRespostaRegistrado(false);
    
    // Definir o tempo de início desta pergunta específica
    questionStartTimeRef.current = Date.now();
    
    // Se for a primeira pergunta, também seta o startTimeRef geral
    if (currentIndex === 0) {
      startTimeRef.current = Date.now();
    }

    // Reset da pergunta no store
    store.resetResposta(currentIndex, true);

    // Configurar sensores web
    if (Platform.OS === "web") {
      clearAccel?.();
      clearGyro?.();
      startAccel();
      startGyro();
    }
  };

  // Iniciar nova pergunta quando o índice mudar
  useEffect(() => {
    startNewQuestion();
  }, [currentIndex]);

  const getElapsedSeconds = () => {
    if (!questionStartTimeRef.current) return 0;
    return Number(((Date.now() - questionStartTimeRef.current) / 1000).toFixed(2));
  };

  const getTotalElapsedSeconds = () => {
    if (!startTimeRef.current) return 0;
    return Number(((Date.now() - startTimeRef.current) / 1000).toFixed(2));
  };

  // Registrar resposta
  const handleAnswer = (id: number) => {
    const tempoDecorrido = getElapsedSeconds();

    store.setResposta(currentIndex, id);

    if (!tempoRespostaRegistrado) {
      store.setTempoResposta(currentIndex, tempoDecorrido);
      setTempoRespostaRegistrado(true);
    }

    store.incrementaClique(currentIndex, id);
  };

  const respostaAtual = store.respostas[currentIndex]?.resposta ?? null;

  const handleNext = async () => {
    const tempoTotalPergunta = getElapsedSeconds();
    const tempoTotalQuestionario = getTotalElapsedSeconds();
    
    console.log(`⏱️ Pergunta ${currentIndex + 1}:`, {
      tempoPergunta: tempoTotalPergunta,
      tempoTotal: tempoTotalQuestionario,
      idle: store.respostas[currentIndex]?.tempoResposta
    });

    // ✅ CORREÇÃO: Atualizar o store com o tempo correto
    store.setTempo(currentIndex, tempoTotalPergunta);

    // ✅ CORREÇÃO: Pequena pausa para garantir que o store foi atualizado
    await new Promise(resolve => setTimeout(resolve, 10));

    try {
      if (Platform.OS === "web") {
        pauseAccel();
        pauseGyro();
      }

      // ✅ CORREÇÃO: Usar o tempo calculado diretamente em vez de confiar no store
      const r = store.respostas[currentIndex];
      
      // ✅ CORREÇÃO: Se r.tempo for 0, usar tempoTotalPergunta
      const duracaoFinal = r.tempo > 0 ? r.tempo : tempoTotalPergunta;

      const firstAccTs = accelerometerSamples[0]?.timestamp ?? null;
      const firstGyroTs = gyroscopeSamples[0]?.timestamp ?? null;

      let timestampInicial = firstAccTs || firstGyroTs || questionStartTimeRef.current;

      if (typeof timestampInicial === "string") {
        timestampInicial = new Date(timestampInicial).getTime();
      }

      const sensores =
        Platform.OS === "web"
          ? accelerometerSamples.map((acc, i) => {
              const gyro = gyroscopeSamples[i] ?? {
                eixo_x: 0,
                eixo_y: 0,
                eixo_z: 0,
                timestamp: acc.timestamp,
              };

              const tsAcc =
                typeof acc.timestamp === "string"
                  ? new Date(acc.timestamp).getTime()
                  : acc.timestamp ?? timestampInicial;

              const offset = tsAcc - timestampInicial;

              return [
                offset,
                acc.eixo_x,
                acc.eixo_y,
                acc.eixo_z,
                gyro.eixo_x,
                gyro.eixo_y,
                gyro.eixo_z,
              ];
            })
          : [];

      const payload = {
        usuario_id: 1,
        pergunta_id: initialId + currentIndex,
        resposta: r.resposta,
        duracao: duracaoFinal, // ✅ CORREÇÃO: Usar valor garantido
        idle: r.tempoResposta, // Tempo até primeira resposta
        quantidade_cliques:
          (r.cliqueResposta1 ?? 0) +
          (r.cliqueResposta2 ?? 0) +
          (r.cliqueResposta3 ?? 0) +
          (r.cliqueResposta4 ?? 0),
        quantidade_passos: 0,
        timestamp_inicial: timestampInicial,
        sensores,
      };

      console.log("📦 PAYLOAD FINAL:", payload);
      console.log("⏰ TEMPO VERIFICAÇÃO:", {
        storeTempo: r.tempo,
        calculadoAgora: tempoTotalPergunta,
        usadoNoPayload: duracaoFinal
      });

      if (endpoint) {
        const response = await fetch(`${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(await response.text());
      }
    } catch (err: any) {
      Alert.alert("Erro", err.message || "Falha ao enviar dados");
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((p) => p + 1);
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