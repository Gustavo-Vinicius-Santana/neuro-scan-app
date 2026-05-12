import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useClickTestStore } from "../../lib/stores/useClickTest";
import { useRequest } from "@/lib/hooks/useRequest";
import { useUserStore } from "@/lib/stores/useUserStore";

type TargetType = "A" | "B";

const TEST_DURATION = 30; // 30 segundos

const isDesktop = (): boolean => {
  if (Platform.OS === 'web') {
    const { width } = Dimensions.get('window');
    return width > 768;
  }
  return false;
};

// Adicionar constantes de cores e estilos
const Colors = {
  primary: "#3B82F6",
  primaryDark: "#1E40AF",
  accent: "#F97316",
  success: "#22C55E",
  error: "#EF4444",
  background: "#F5F7FA",
  white: "#FFFFFF",
  text: "#111827",
  textMuted: "#6B7280",
  card: "#F9FAFB",
  border: "#E5E7EB",
};

const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
};

const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const BorderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 9999,
};

export default function Test() {
  const {
    startTest,
    addClick,
    computeMetrics,
    saveMetrics,
    reset,
    lastMetrics,
  } = useClickTestStore();

  const { post, loading: sendingData } = useRequest();
  const { user } = useUserStore();
  
  const [sending, setSending] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TEST_DURATION);
  const [currentClicks, setCurrentClicks] = useState(0);
  const [targetAClicks, setTargetAClicks] = useState(0);
  const [targetBClicks, setTargetBClicks] = useState(0);
  const [touchStartTime, setTouchStartTime] = useState<number | null>(null);
  const [currentTarget, setCurrentTarget] = useState<TargetType | null>(null);
  const [isKeyPressedA, setIsKeyPressedA] = useState(false);
  const [isKeyPressedB, setIsKeyPressedB] = useState(false);
  const [touchStartTimeA, setTouchStartTimeA] = useState<number | null>(null);
  const [touchStartTimeB, setTouchStartTimeB] = useState<number | null>(null);

  const intervalRef = useRef<any>(null);

  // ---------------------------------------------------
  // ENVIAR DADOS PARA O BACKEND
  // ---------------------------------------------------
  const sendResultsToBackend = async () => {
    if (!lastMetrics) return;
    
    setSending(true);
    
    try {
      const userId = user?.id;
      
      const payload = {
        usuario_id: userId,
        total_cliques: lastMetrics.totalClicks,
        duracao_teste_segundos: lastMetrics.testDuration,
        cliques_por_segundo: lastMetrics.clicksPerSecond,
        intervalo_medio_segundos: lastMetrics.averageInterval,
        timestamps_cliques: lastMetrics.clickTimestamps,
        alvo_A_acertos: lastMetrics.targetA_Hits,
        alvo_B_acertos: lastMetrics.targetB_Hits,
        duracao_media_toque: lastMetrics.averageTouchDuration,
      };

      const api = process.env.EXPO_PUBLIC_API_URL;
      await post(`${api}api/clicktest`, payload); 
      
      console.log("Dados enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    } finally {
      setSending(false);
    }
  };

  // ---------------------------------------------------
  // INICIAR TESTE
  // ---------------------------------------------------
  const startTestClick = () => {
    reset();
    setFinished(false);
    setTimeRemaining(TEST_DURATION);
    setCurrentClicks(0);
    setTargetAClicks(0);
    setTargetBClicks(0);
    setStarted(true);
    setSending(false);
    startTest();
  };

  // ---------------------------------------------------
  // REGISTRAR CLIQUE
  // ---------------------------------------------------
  const handleTouchStart = (target: TargetType) => {
    if (!started || finished) return;
    
    if (target === 'A') {
      setTouchStartTimeA(Date.now());
    } else {
      setTouchStartTimeB(Date.now());
    }
  };

  const handleTouchEnd = () => {
    if (!started || finished) return;
    
    let touchDuration = 0;
    
    if (touchStartTimeA) {
      touchDuration = Date.now() - touchStartTimeA;
      setTouchStartTimeA(null);
      addClick('A', touchDuration);
      setCurrentClicks(prev => prev + 1);
      setTargetAClicks(prev => prev + 1);
    } else if (touchStartTimeB) {
      touchDuration = Date.now() - touchStartTimeB;
      setTouchStartTimeB(null);
      addClick('B', touchDuration);
      setCurrentClicks(prev => prev + 1);
      setTargetBClicks(prev => prev + 1);
    }
  };

  // ---------------------------------------------------
  // SUPORTE A TECLADO (DESKTOP)
  // ---------------------------------------------------
  useEffect(() => {
    if (!started || finished || Platform.OS !== 'web') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (key === 'a' && !isKeyPressedA) {
        setIsKeyPressedA(true);
        setTouchStartTimeA(Date.now());
      } else if (key === 'd' && !isKeyPressedB) {
        setIsKeyPressedB(true);
        setTouchStartTimeB(Date.now());
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (key === 'a' && isKeyPressedA && touchStartTimeA) {
        const touchDuration = Date.now() - touchStartTimeA;
        addClick('A', touchDuration);
        setCurrentClicks(prev => prev + 1);
        setTargetAClicks(prev => prev + 1);
        
        setIsKeyPressedA(false);
        setTouchStartTimeA(null);
      } else if (key === 'd' && isKeyPressedB && touchStartTimeB) {
        const touchDuration = Date.now() - touchStartTimeB;
        addClick('B', touchDuration);
        setCurrentClicks(prev => prev + 1);
        setTargetBClicks(prev => prev + 1);
        
        setIsKeyPressedB(false);
        setTouchStartTimeB(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [started, finished, isKeyPressedA, isKeyPressedB, touchStartTimeA, touchStartTimeB]);

  // ---------------------------------------------------
  // CONTADOR DE TEMPO
  // ---------------------------------------------------
  useEffect(() => {
    if (!started || finished) return;

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setFinished(true);
          const m = computeMetrics();
          saveMetrics(m);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [started, finished]);

  // ---------------------------------------------------
  // ENVIA DADOS QUANDO O TESTE TERMINAR
  // ---------------------------------------------------
  useEffect(() => {
    if (finished && lastMetrics) {
      sendResultsToBackend();
    }
  }, [finished, lastMetrics]);

  // ---------------------------------------------------
  // RENDER
  // ---------------------------------------------------
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* INSTRUÇÕES */}
      {!started && !finished && !sending && (
        <View style={styles.instructionsBox}>
          <Text style={styles.title}>Teste de Cliques</Text>

          <Text style={styles.description}>
            Toque na tela o máximo de vezes que conseguir durante 30 segundos.
          </Text>

          <View style={styles.keyboardHint}>
            <Text style={styles.keyboardHintTitle}>💻 No computador use:</Text>
            <View style={styles.keyboardRow}>
              <View style={styles.keyItem}>
                <View style={[styles.keyBadge, { backgroundColor: Colors.primary }]}>
                  <Text style={styles.keyBadgeText}>A</Text>
                </View>
                <Text style={styles.keyLabel}>Alvo A</Text>
              </View>
              <View style={styles.keyItem}>
                <View style={[styles.keyBadge, { backgroundColor: Colors.accent }]}>
                  <Text style={styles.keyBadgeText}>D</Text>
                </View>
                <Text style={styles.keyLabel}>Alvo B</Text>
              </View>
            </View>
          </View>

          <View style={styles.targetsContainer}>
            <View style={styles.targetExampleA}>
              <Text style={styles.targetLabelA}>A</Text>
            </View>
            <View style={styles.targetExampleB}>
              <Text style={styles.targetLabelB}>B</Text>
            </View>
          </View>

          <Text style={[styles.description, { marginTop: 10, opacity: 0.7 }]}>
            Toque nos alvos ou use as teclas A (esquerdo) e D (direito) no teclado.
          </Text>

          <TouchableOpacity style={styles.startButton} onPress={startTestClick}>
            <Text style={styles.startText}>Iniciar Teste</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* TESTE EM ANDAMENTO */}
      {started && !finished && !sending && (
        <View style={styles.runningContainer}>
          {/* Timer bar */}
          <View style={styles.timerBar}>
            <View
              style={[
                styles.timerIndicator,
                { backgroundColor: timeRemaining <= 5 ? Colors.error : Colors.success },
              ]}
            />
            <Text
              style={[
                styles.timerText,
                { color: timeRemaining <= 5 ? Colors.error : Colors.text },
              ]}
            >
              {timeRemaining}s restantes
            </Text>
          </View>

          <Text style={styles.runningHint}>
            PRESSIONE OS ALVOS OU AS TECLAS A E D!
          </Text>

          {/* Tap squares */}
          <View style={styles.squaresRow}>
            <View style={styles.squareContainer}>
              <TouchableOpacity
                style={[
                  styles.tapSquare,
                  styles.tapSquareLeft,
                  (currentTarget === "A" || isKeyPressedA) && styles.tapSquarePressed
                ]}
                onPressIn={() => handleTouchStart("A")}
                onPressOut={handleTouchEnd}
                activeOpacity={0.8}
              >
                <Text style={styles.keyLabel}>A</Text>
                <Text style={styles.tapCount}>{targetAClicks}</Text>
                <Text style={styles.tapLabel}>Esquerdo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.squareContainer}>
              <TouchableOpacity
                style={[
                  styles.tapSquare,
                  styles.tapSquareRight,
                  (currentTarget === "B" || isKeyPressedB) && styles.tapSquarePressed
                ]}
                onPressIn={() => handleTouchStart("B")}
                onPressOut={handleTouchEnd}
                activeOpacity={0.8}
              >
                <Text style={styles.keyLabel}>B</Text>
                <Text style={styles.tapCount}>{targetBClicks}</Text>
                <Text style={styles.tapLabel}>Direito</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.totalRunning}>Total: {currentClicks}</Text>
        </View>
      )}

      {/* ENVIANDO DADOS */}
      {sending && (
        <View style={styles.sendingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.sendingText}>Enviando resultados...</Text>
        </View>
      )}

      {/* FINAL */}
      {finished && !sending && (
        <View style={styles.endContainer}>
          <Text style={styles.endText}>Teste Finalizado!</Text>
          
          <Text style={styles.resultText}>
            Total de cliques: {lastMetrics?.totalClicks || 0}
          </Text>
          
          <Text style={styles.resultText}>
            Alvo A: {lastMetrics?.targetA_Hits || 0} cliques
          </Text>
          
          <Text style={styles.resultText}>
            Alvo B: {lastMetrics?.targetB_Hits || 0} cliques
          </Text>
          
          <Text style={styles.resultText}>
            Duração média do toque: {(lastMetrics?.averageTouchDuration || 0).toFixed(0)}ms
          </Text>

          <TouchableOpacity
            style={styles.resultsButton}
            onPress={() => router.push("/(results)/resultClickTest")}
          >
            <Text style={styles.resultsText}>Ver Resultados</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.restartButton} onPress={startTestClick}>
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

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 6,
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

  sendingContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  sendingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#222",
    fontWeight: "600",
  },

  endContainer: {
    alignItems: "center",
    width: "100%",
  },

  endText: {
    fontSize: 26,
    color: "#111",
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
    color: "#222",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },

  targetsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },

  targetExampleA: {
    width: 100,
    height: 100,
    backgroundColor: '#E8F4FD',
    borderWidth: 2,
    borderColor: '#005FCC',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetExampleB: {
    width: 100,
    height: 100,
    backgroundColor: '#FFF7ED',
    borderWidth: 2,
    borderColor: '#F97316',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetLabelA: {
    fontSize: 32,
    fontWeight: '700',
    color: '#005FCC',
  },
  targetLabelB: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F97316',
  },

  keyboardHint: {
    backgroundColor: '#F8F9FA',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: Spacing.md,
    width: '100%',
    alignItems: 'center',
    marginVertical: Spacing.sm,
  },

  keyboardHintTitle: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: Spacing.sm,
  },

  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginBottom: Spacing.sm,
  },

  keyItem: {
    alignItems: 'center',
  },

  keyBadge: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
  },

  keyBadgeText: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.white,
  },

  runningContainer: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: "center",
    backgroundColor: Colors.background,
  },

  timerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },

  timerIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: Spacing.sm,
  },

  timerText: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: "#111",
  },

  runningHint: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
    color: Colors.success,
    textAlign: "center",
    marginBottom: Spacing.lg,
    letterSpacing: 1,
  },

  squaresRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.xl,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },

  squareContainer: {
    flex: 1,
    maxWidth: 180,
    alignItems: "center",
  },

  tapSquare: {
    aspectRatio: 1,
    borderRadius: BorderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 160,
  },

  tapSquareLeft: {
    backgroundColor: Colors.primary,
  },

  tapSquareRight: {
    backgroundColor: Colors.accent,
  },

  tapSquarePressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },

  keyLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  tapCount: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.white,
    marginTop: Spacing.xs,
    marginBottom: 20,
  },

  tapLabel: {
    fontSize: FontSizes.sm,
    color: "#FFF",
    marginTop: Spacing.xs,
  },

  totalRunning: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
  },

  resultText: {
    fontSize: 20,
    color: "#666666",
    marginBottom: 10,
    fontWeight: "600",
  },
});
