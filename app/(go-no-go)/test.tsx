import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useGoNoGoStore } from "../../lib/stores/useGoNoGo";

// Tipo do estímulo
type StimType = "GO" | "NOGO";

const TOTAL_STIMULI = 10;
const GO_PROPORTION = 0.7;

const STIM_DURATION = 800;
const INTERVAL_DURATION = 700;

export default function Test() {
  const {
    addStimulus,
    registerResponse,
    computeMetrics,
    reset,
    saveMetrics,
  } = useGoNoGoStore();

  const [stimuliList, setStimuliList] = useState<StimType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStim, setCurrentStim] = useState<StimType | null>(null);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isStimVisible, setIsStimVisible] = useState(false);

  const respondedRef = useRef(false);
  const stimStartRef = useRef(0);

  // ---------------------------------------------------
  // GERA SEQUÊNCIA
  // ---------------------------------------------------
  const buildSequence = (): StimType[] => {
    const numGo = Math.round(TOTAL_STIMULI * GO_PROPORTION);
    const numNoGo = TOTAL_STIMULI - numGo;

    const pool: StimType[] = [
      ...Array(numGo).fill("GO"),
      ...Array(numNoGo).fill("NOGO"),
    ];

    const result: StimType[] = [];

    let lastNoGoCount = 0;

    while (pool.length > 0) {
      // Filtra opções que não violam a regra
      const validOptions = pool.filter((stim) => {
        if (stim === "NOGO" && lastNoGoCount >= 3) return false;
        return true;
      });

      // Escolhe aleatoriamente entre as opções válidas
      const choice = validOptions[Math.floor(Math.random() * validOptions.length)];
      result.push(choice);

      // Remove 1 ocorrência do estímulo escolhido do pool
      const index = pool.indexOf(choice);
      pool.splice(index, 1);

      // Atualiza contador de NOGO consecutivos
      if (choice === "NOGO") {
        lastNoGoCount++;
      } else {
        lastNoGoCount = 0;
      }
    }

    return result;
  };

  // ---------------------------------------------------
  // INICIAR TESTE
  // ---------------------------------------------------
  const startTest = () => {
    reset();
    setFinished(false);
    setCurrentIndex(0);
    setStimuliList(buildSequence());
    setStarted(true);
  };

  // ---------------------------------------------------
  // RESPOSTA DO USUÁRIO (registrar RT)
  // ---------------------------------------------------
  const handleResponse = () => {
    if (!isStimVisible || respondedRef.current) return;

    respondedRef.current = true;
    const rt = Date.now() - stimStartRef.current;

    registerResponse(rt);
  };

  // ---------------------------------------------------
  // QUANDO O USUÁRIO NÃO RESPONDE
  // ---------------------------------------------------
  const handleNoResponse = () => {
    if (!respondedRef.current) {
      registerResponse();
    }
  };

  // ---------------------------------------------------
  // LOOP PRINCIPAL DO TESTE
  // ---------------------------------------------------
  useEffect(() => {
    if (!started) return;
    if (stimuliList.length === 0) return;

    if (currentIndex >= TOTAL_STIMULI) {
      const m = computeMetrics();
      saveMetrics(m);
      setFinished(true);
      return;
    }

    respondedRef.current = false;

    setTimeout(() => {
      const stim = stimuliList[currentIndex];
      setCurrentStim(stim);
      addStimulus(stim);
      stimStartRef.current = Date.now();
      setIsStimVisible(true);

      setTimeout(() => {
        setIsStimVisible(false);
        handleNoResponse();

        setCurrentIndex((p) => p + 1);
      }, STIM_DURATION);
    }, INTERVAL_DURATION);
  }, [currentIndex, stimuliList, started]);

  // ---------------------------------------------------
  // RENDER
  // ---------------------------------------------------
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* INSTRUÇÕES */}
      {!started && !finished && (
        <View style={styles.instructionsBox}>
          <Text style={styles.title}>Teste Go/No-Go</Text>

          <Text style={styles.description}>
            Toque na tela <Text style={{ fontWeight: "bold" }}>somente</Text> quando aparecer o estímulo verde.
          </Text>

          <View style={styles.circleExampleContainer}>
            <View style={[styles.circle, { backgroundColor: "#00CC00" }]} />
          </View>

          <Text style={styles.description}>
            Não toque quando aparecer o estímulo vermelho.
          </Text>

          <View style={styles.circleExampleContainer}>
            <View style={[styles.circle, { backgroundColor: "#CC0000" }]} />
          </View>

          <Text style={[styles.description, { marginTop: 10, opacity: 0.7 }]}>
            O teste mede seu tempo de reação, precisão e autocontrole.
          </Text>

          <TouchableOpacity style={styles.startButton} onPress={startTest}>
            <Text style={styles.startText}>Iniciar Teste</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* TESTE EM ANDAMENTO */}
      {started && !finished && (
        <TouchableOpacity
          style={styles.stimContainer}
          onPress={handleResponse}
          activeOpacity={1}
        >
          <Text style={styles.counterText}>
            {currentIndex + 1} / {TOTAL_STIMULI}
          </Text>

          {isStimVisible ? (
            <View
              style={[
                styles.circle,
                {
                  backgroundColor:
                    currentStim === "GO" ? "#00CC00" : "#CC0000",
                },
              ]}
            />
          ) : (
            <Text style={styles.waitText}>+</Text>
          )}
        </TouchableOpacity>
      )}

      {/* FINAL */}
      {finished && (
        <View style={styles.endContainer}>
          <Text style={styles.endText}>Teste Finalizado!</Text>

          <TouchableOpacity
            style={styles.resultsButton}
            onPress={() => router.push("/resultGoNoGo")}
          >
            <Text style={styles.resultsText}>Ver Resultados</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.restartButton} onPress={startTest}>
            <Text style={styles.restartText}>Refazer Teste</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  instructionsBox: {
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 18,
    alignItems: "center",
    width: "92%",
    elevation: 5,
  },

  circleExampleContainer: {
    marginBottom: 10,
    marginTop: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 6,
  },

  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },

  startButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 14,
    marginTop: 25,
    width: "80%",
  },

  startText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  stimContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  waitText: {
    fontSize: 80,
    color: "#AAA",
  },

  counterText: {
    position: "absolute",
    top: 50,
    fontSize: 20,
    color: "#333",
    opacity: 0.6,
  },

  endContainer: {
    alignItems: "center",
    width: "100%",
  },

  endText: {
    fontSize: 26,
    color: "#222",
    marginBottom: 25,
    fontWeight: "700",
  },

  resultsButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: "75%",
    marginBottom: 15,
  },

  resultsText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  restartButton: {
    backgroundColor: "#DDD",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: "75%",
  },

  restartText: {
    color: "#333",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
});
