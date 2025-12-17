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
import { useGoNoGoStore } from "../../lib/stores/useGoNoGo";
import { useRequest } from "@/lib/hooks/useRequest"; // Importe seu hook
import { useUserStore } from "@/lib/stores/useUserStore";

// Tipo do estímulo
type StimType = "GO" | "NOGO";

const TOTAL_STIMULI = 100;
const GO_PROPORTION = 0.7;

const STIM_DURATION = 800;

const isDesktop = (): boolean => {
  // Em React Native Web, Platform.OS será 'web'
  if (Platform.OS === 'web') {
    const { width } = Dimensions.get('window');
    // Considera desktop se a largura for maior que 768px
    // Você pode ajustar esse valor conforme necessário
    return width > 768;
  }
  // Em dispositivos móveis nativos (iOS/Android), sempre false
  return false;
};

const INTERVAL_DURATION = isDesktop() ? 700 : 300;

export default function Test() {
  const {
    addStimulus,
    registerResponse,
    computeMetrics,
    reset,
    saveMetrics,
    lastMetrics,
  } = useGoNoGoStore();

  const { post, loading: sendingData } = useRequest(); // Use seu hook
  const { user } = useUserStore();
  
  const [sending, setSending] = useState(false);

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
    
    // Cria arrays separados
    const goArray: StimType[] = Array(numGo).fill("GO");
    const noGoArray: StimType[] = Array(numNoGo).fill("NOGO");
    
    const result: StimType[] = [];
    let consecutiveCount = 0;
    let lastType: StimType | null = null;
    
    // Índices para controlar quantos de cada tipo já usamos
    let goUsed = 0;
    let noGoUsed = 0;
    
    while (result.length < TOTAL_STIMULI) {
      // Calcula quantos de cada tipo ainda precisa usar
      const goNeeded = numGo - goUsed;
      const noGoNeeded = numNoGo - noGoUsed;
      
      // Determina tipos possíveis
      const possibleTypes: StimType[] = [];
      if (goNeeded > 0) possibleTypes.push("GO");
      if (noGoNeeded > 0) possibleTypes.push("NOGO");
      
      // Se só tem um tipo possível, usa ele
      if (possibleTypes.length === 1) {
        const onlyType = possibleTypes[0];
        result.push(onlyType);
        if (onlyType === "GO") goUsed++;
        else noGoUsed++;
        
        if (onlyType === lastType) consecutiveCount++;
        else {
          consecutiveCount = 1;
          lastType = onlyType;
        }
        continue;
      }
      
      // Se já tem 3 consecutivos do mesmo tipo, força o outro
      if (consecutiveCount >= 3 && lastType) {
        const forcedType: string = lastType === "GO" ? "NOGO" : "GO";
        
        // Verifica se pode usar o tipo forçado
        if ((forcedType === "GO" && goNeeded > 0) || 
            (forcedType === "NOGO" && noGoNeeded > 0)) {
          result.push(forcedType);
          if (forcedType === "GO") goUsed++;
          else noGoUsed++;
          
          consecutiveCount = 1;
          lastType = forcedType;
        } else {
          // Se não pode forçar, usa o mesmo tipo
          result.push(lastType);
          if (lastType === "GO") goUsed++;
          else noGoUsed++;
          
          consecutiveCount++;
        }
        continue;
      }
      
      // Escolhe aleatoriamente, mas com bias baseado no que resta
      // Ajusta probabilidade para manter proporção
      const totalNeeded = goNeeded + noGoNeeded;
      const goProbability = goNeeded / totalNeeded;
      
      const random = Math.random();
      const chosenType = random < goProbability ? "GO" : "NOGO";
      
      // Verifica se ainda tem do tipo escolhido
      if ((chosenType === "GO" && goNeeded > 0) || 
          (chosenType === "NOGO" && noGoNeeded > 0)) {
        result.push(chosenType);
        if (chosenType === "GO") goUsed++;
        else noGoUsed++;
        
        if (chosenType === lastType) {
          consecutiveCount++;
        } else {
          consecutiveCount = 1;
          lastType = chosenType;
        }
      } else {
        // Se não tem, usa o outro tipo
        const otherType = chosenType === "GO" ? "NOGO" : "GO";
        result.push(otherType);
        if (otherType === "GO") goUsed++;
        else noGoUsed++;
        
        if (otherType === lastType) {
          consecutiveCount++;
        } else {
          consecutiveCount = 1;
          lastType = otherType;
        }
      }
    }
    
    // Verificação final
    const finalGoCount = result.filter(stim => stim === "GO").length;
    const finalNoGoCount = result.filter(stim => stim === "NOGO").length;
    
    console.log(`Sequência final: ${finalGoCount} GO, ${finalNoGoCount} NOGO`);
    
    return result;
  };

  // ---------------------------------------------------
  // ENVIAR DADOS PARA O BACKEND
  // ---------------------------------------------------
  const sendResultsToBackend = async () => {
    if (!lastMetrics) return;
    
    setSending(true);
    
    try {
      // TODO: Obter o ID do usuário logado
      // Isso pode vir de um contexto de autenticação, AsyncStorage, etc.
      const userId = user?.id; // Substitua pela lógica real de obtenção do userId
      
      const payload = {
        usuario_id: userId,
        erros_comissao_percentual: lastMetrics.commissionErrorsPct,
        erros_omissao_percentual: lastMetrics.omissionErrorsPct,
        acerto_go_percentual: lastMetrics.goAccuracyPct,
        tempo_medio_reacao_ms: lastMetrics.meanRT,
        variabilidade_rt_ms: lastMetrics.rtStdDev,
        latencia_media_nogo_erro: lastMetrics.meanNoGoLatency,
      };

      // Envia para o endpoint
      const api = process.env.EXPO_PUBLIC_API_URL;

      await post(`${api}api/gonogo`, payload); 
      
      console.log("Dados enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      // Mesmo com erro, permite ver os resultados
    } finally {
      setSending(false);
    }
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
    setSending(false); // Reseta estado de envio
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
      {started && !finished && !sending && (
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

      {/* ENVIANDO DADOS */}
      {sending && (
        <View style={styles.sendingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.sendingText}>Enviando resultados...</Text>
        </View>
      )}

      {/* FINAL (após envio ou se falhar o envio) */}
      {finished && !sending && (
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

  sendingContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  sendingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
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