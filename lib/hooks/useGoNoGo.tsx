import { useState, useEffect, useRef, useCallback } from "react";
import { Vibration } from "react-native";

// --------------------------------------------------------
// TIPOS PADRONIZADOS (USANDO "GO" E "NOGO")
// --------------------------------------------------------
export type StimulusType = "GO" | "NOGO";
export type AppState = "ready" | "stimulus" | "interval" | "results";
export type TrialResponse = "correct" | "incorrect" | "missed";

interface Score {
  correct: number;
  incorrect: number;
  missed: number;
}

interface TrialResult {
  type: StimulusType;
  response: TrialResponse;
  reactionTime?: number;
  trialNumber: number;
}

interface UseGoNoGoReturn {
  currentState: AppState;
  currentStimulus: StimulusType | null;
  currentTrial: number;
  totalTrials: number;
  score: Score;
  trialResults: TrialResult[];
  averageReactionTime: number;
  startExperiment: () => void;
  handleResponse: () => void;
  resetExperiment: () => void;
}

// --------------------------------------------------------
// CONSTANTES DO EXPERIMENTO
// --------------------------------------------------------
const TOTAL_TRIALS = 100;
const STIMULUS_DURATION = 1500;
const INTERVAL_DURATION = 500;

export const useGoNoGo = (): UseGoNoGoReturn => {
  const [currentState, setCurrentState] = useState<AppState>("ready");
  const [currentStimulus, setCurrentStimulus] = useState<StimulusType | null>(null);
  const [trials, setTrials] = useState<StimulusType[]>([]);
  const [currentTrial, setCurrentTrial] = useState(0);

  const [score, setScore] = useState<Score>({
    correct: 0,
    incorrect: 0,
    missed: 0,
  });

  const [trialResults, setTrialResults] = useState<TrialResult[]>([]);

  const stimulusTimeout = useRef<number | null>(null);
  const intervalTimeout = useRef<number | null>(null);
  const trialStartTime = useRef(0);

  // --------------------------------------------------------
  // GERA SEQUÊNCIA DE TRIALS
  // --------------------------------------------------------
  const generateTrials = useCallback((): StimulusType[] => {
    const goCount = 70;
    const noGoCount = 30;

    let arr: StimulusType[] = [
      ...Array(goCount).fill("GO"),
      ...Array(noGoCount).fill("NOGO"),
    ];

    // Fisher-Yates Shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // Restringe máximo de 3 NOGO seguidos
    let streak = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "NOGO") {
        streak++;
        if (streak > 3) {
          const swapIndex = arr.findIndex((v, idx) => idx > i && v === "GO");
          if (swapIndex !== -1) {
            [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
          }
          streak = 1;
        }
      } else {
        streak = 0;
      }
    }

    // Debug
    console.log("Trials gerados:", arr.length);
    console.log("GO:", arr.filter(t => t === "GO").length);
    console.log("NOGO:", arr.filter(t => t === "NOGO").length);
    
    return arr;
  }, []);

  // --------------------------------------------------------
  // LIMPA TIMEOUTS
  // --------------------------------------------------------
  const clearTimeouts = useCallback(() => {
    if (stimulusTimeout.current) {
      clearTimeout(stimulusTimeout.current);
      stimulusTimeout.current = null;
    }
    if (intervalTimeout.current) {
      clearTimeout(intervalTimeout.current);
      intervalTimeout.current = null;
    }
  }, []);

  // --------------------------------------------------------
  // EVENTOS DE RESPOSTA (SEM DEPENDÊNCIAS CÍCLICAS)
  // --------------------------------------------------------
  const handleCorrectGo = useCallback((reactionTime: number) => {
    setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    setTrialResults((prev) => [
      ...prev,
      {
        type: "GO",
        response: "correct",
        reactionTime,
        trialNumber: currentTrial + 1,
      },
    ]);
    setCurrentTrial((t) => t + 1);
    Vibration.vibrate(50);
  }, [currentTrial]);

  const handleIncorrectNoGo = useCallback(() => {
    setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    setTrialResults((prev) => [
      ...prev,
      { type: "NOGO", response: "incorrect", trialNumber: currentTrial + 1 },
    ]);
    setCurrentTrial((t) => t + 1);
    Vibration.vibrate([0, 100, 50, 100]);
  }, [currentTrial]);

  const handleCorrectNoGo = useCallback(() => {
    setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    setTrialResults((prev) => [
      ...prev,
      { type: "NOGO", response: "correct", trialNumber: currentTrial + 1 },
    ]);
    setCurrentTrial((t) => t + 1);
  }, [currentTrial]);

  const handleMissedGo = useCallback(() => {
    setScore((prev) => ({ ...prev, missed: prev.missed + 1 }));
    setTrialResults((prev) => [
      ...prev,
      { type: "GO", response: "missed", trialNumber: currentTrial + 1 },
    ]);
    setCurrentTrial((t) => t + 1);
  }, [currentTrial]);

  // --------------------------------------------------------
  // MOSTRA ESTÍMULO
  // --------------------------------------------------------
  const showStimulus = useCallback(() => {
    console.log("showStimulus chamado - trial:", currentTrial, "total:", trials.length);
    
    if (currentTrial >= trials.length) {
      console.log("Fim dos trials - chamando endExperiment");
      endExperiment();
      return;
    }
    
    const stimulus = trials[currentTrial];
    console.log("Mostrando estímulo:", stimulus, "trial:", currentTrial + 1);
    
    setCurrentStimulus(stimulus);
    setCurrentState("stimulus");
    trialStartTime.current = Date.now();

    stimulusTimeout.current = setTimeout(() => {
      console.log("Timeout do estímulo - tipo:", stimulus);
      if (stimulus === "GO") {
        handleMissedGo();
      } else {
        handleCorrectNoGo();
      }
    }, STIMULUS_DURATION);
  }, [currentTrial, trials, handleMissedGo, handleCorrectNoGo]);

  // --------------------------------------------------------
  // INTERVALO ENTRE ESTÍMULOS
  // --------------------------------------------------------
  const startInterval = useCallback(() => {
    console.log("Iniciando intervalo");
    setCurrentStimulus(null);
    setCurrentState("interval");

    intervalTimeout.current = setTimeout(() => {
      console.log("Timeout do intervalo - chamando showStimulus");
      showStimulus();
    }, INTERVAL_DURATION);
  }, [showStimulus]);

  // --------------------------------------------------------
  // HANDLE RESPONSE (ATUALIZADO)
  // --------------------------------------------------------
  const handleResponse = useCallback(() => {
    console.log("Resposta recebida - estado:", currentState, "estímulo:", currentStimulus);
    
    if (currentState !== "stimulus" || !currentStimulus) return;

    clearTimeouts();
    const reactionTime = Date.now() - trialStartTime.current;
    console.log("Tempo de reação:", reactionTime, "ms");

    if (currentStimulus === "GO") {
      handleCorrectGo(reactionTime);
    } else {
      handleIncorrectNoGo();
    }

    startInterval();
  }, [currentState, currentStimulus, clearTimeouts, handleCorrectGo, handleIncorrectNoGo, startInterval]);

  // --------------------------------------------------------
  // FINALIZA EXPERIMENTO
  // --------------------------------------------------------
  const endExperiment = useCallback(() => {
    console.log("Finalizando experimento");
    clearTimeouts();
    setCurrentState("results");
  }, [clearTimeouts]);

  // --------------------------------------------------------
  // INICIA EXPERIMENTO
  // --------------------------------------------------------
  const startExperiment = useCallback(() => {
    console.log("Iniciando experimento");
    const generatedTrials = generateTrials();
    
    setTrials(generatedTrials);
    setCurrentTrial(0);
    setScore({ correct: 0, incorrect: 0, missed: 0 });
    setTrialResults([]);
    
    // Iniciar o primeiro intervalo
    setCurrentState("interval");
    setTimeout(() => {
      showStimulus();
    }, INTERVAL_DURATION);
  }, [generateTrials, showStimulus]);

  // --------------------------------------------------------
  // RESETA EXPERIMENTO
  // --------------------------------------------------------
  const resetExperiment = useCallback(() => {
    console.log("Resetando experimento");
    clearTimeouts();
    setCurrentState("ready");
    setCurrentStimulus(null);
    setTrials([]);
    setCurrentTrial(0);
    setScore({ correct: 0, incorrect: 0, missed: 0 });
    setTrialResults([]);
  }, [clearTimeouts]);

  // --------------------------------------------------------
  // EFFECT PARA FINALIZAR QUANDO ACABAM OS TRIALS
  // --------------------------------------------------------
  useEffect(() => {
    if (trials.length > 0 && currentTrial >= trials.length && currentState !== "results") {
      console.log("Effect detectou fim dos trials");
      endExperiment();
    }
  }, [currentTrial, trials.length, currentState, endExperiment]);

  // --------------------------------------------------------
  // EFFECT PARA INICIAR PRÓXIMO STIMULUS APÓS AVANÇAR TRIAL
  // --------------------------------------------------------
  useEffect(() => {
    if (currentState === "interval" && currentTrial < trials.length && currentTrial > 0) {
      console.log("Effect iniciando próximo estímulo - trial:", currentTrial);
      startInterval();
    }
  }, [currentState, currentTrial, trials.length, startInterval]);

  // --------------------------------------------------------
  // CLEANUP
  // --------------------------------------------------------
  useEffect(() => {
    return () => {
      console.log("Cleanup - limpando timeouts");
      clearTimeouts();
    };
  }, [clearTimeouts]);

  // --------------------------------------------------------
  // TEMPO MÉDIO DE REAÇÃO
  // --------------------------------------------------------
  const rtValues = trialResults
    .filter((t) => t.reactionTime !== undefined)
    .map((t) => t.reactionTime!) as number[];

  const averageReactionTime =
    rtValues.length > 0
      ? rtValues.reduce((a, b) => a + b, 0) / rtValues.length
      : 0;

  // --------------------------------------------------------
  // RETORNO DO HOOK
  // --------------------------------------------------------
  return {
    currentState,
    currentStimulus,
    currentTrial: currentTrial + 1,
    totalTrials: TOTAL_TRIALS,
    score,
    trialResults,
    averageReactionTime,
    startExperiment,
    handleResponse,
    resetExperiment,
  };
};