import { create } from "zustand";

type TargetType = "A" | "B";

export interface ClickLog {
  timestamp: number;
  clickNumber: number;
  target: TargetType;
  touchDuration: number; // duração do toque em ms
}

export interface ClickTestMetrics {
  totalClicks: number;
  testDuration: number;
  clicksPerSecond: number;
  averageInterval: number;
  clickTimestamps: number[];
  targetA_Hits: number;
  targetB_Hits: number;
  averageTouchDuration: number;
  touchDurations: number[];
  frequencyOverTime: { time: number; frequency: number }[];
}

interface StoreState {
  logs: ClickLog[];
  lastMetrics: ClickTestMetrics | null;
  testStartTime: number | null;

  startTest: () => void;
  addClick: (target: TargetType, touchDuration: number) => void;
  computeMetrics: () => ClickTestMetrics;
  saveMetrics: (m: ClickTestMetrics) => void;
  reset: () => void;
  getFrequencyOverTime: () => { time: number; frequency: number }[];
}

export const useClickTestStore = create<StoreState>((set, get) => ({
  logs: [],
  lastMetrics: null,
  testStartTime: null,

  /** Inicia o teste */
  startTest: () =>
    set((state) => ({
      logs: [],
      lastMetrics: null,
      testStartTime: Date.now(),
    })),

  /** Registra um clique */
  addClick: (target: TargetType, touchDuration: number) =>
    set((state) => {
      const now = Date.now();
      const clickNumber = state.logs.length + 1;
      
      return {
        logs: [
          ...state.logs,
          {
            timestamp: now,
            clickNumber,
            target,
            touchDuration,
          },
        ],
      };
    }),

  /** Cálculo das métricas */
  computeMetrics: () => {
    const { logs, testStartTime } = get();
    
    if (!testStartTime || logs.length === 0) {
      return {
        totalClicks: 0,
        testDuration: 0,
        clicksPerSecond: 0,
        averageInterval: 0,
        clickTimestamps: [],
        targetA_Hits: 0,
        targetB_Hits: 0,
        averageTouchDuration: 0,
        touchDurations: [],
        frequencyOverTime: [],
      };
    }

    const testEndTime = Date.now();
    const testDuration = (testEndTime - testStartTime) / 1000; // em segundos
    const totalClicks = logs.length;
    const clicksPerSecond = totalClicks / testDuration;
    
    // Calcula intervalos médios entre cliques
    const intervals: number[] = [];
    for (let i = 1; i < logs.length; i++) {
      intervals.push((logs[i].timestamp - logs[i-1].timestamp) / 1000);
    }
    
    const averageInterval = intervals.length > 0 
      ? intervals.reduce((a, b) => a + b, 0) / intervals.length 
      : 0;

    const clickTimestamps = logs.map(log => log.timestamp);
    
    // Métricas por alvo
    const targetA_Hits = logs.filter(log => log.target === "A").length;
    const targetB_Hits = logs.filter(log => log.target === "B").length;
    
    // Métricas de duração do toque
    const touchDurations = logs.map(log => log.touchDuration);
    const averageTouchDuration = touchDurations.length > 0
      ? touchDurations.reduce((a, b) => a + b, 0) / touchDurations.length
      : 0;
    
    // Frequência ao longo do tempo (a cada 5 segundos)
    const frequencyOverTime = get().getFrequencyOverTime();

    return {
      totalClicks,
      testDuration,
      clicksPerSecond,
      averageInterval,
      clickTimestamps,
      targetA_Hits,
      targetB_Hits,
      averageTouchDuration,
      touchDurations,
      frequencyOverTime,
    };
  },

  /** Calcula frequência de cliques ao longo do tempo */
  getFrequencyOverTime: () => {
    const { logs, testStartTime } = get();
    if (!testStartTime || logs.length === 0) return [];
    
    const frequencyData: { time: number; frequency: number }[] = [];
    const windowSize = 5; // janela de 5 segundos
    
    for (let time = 0; time <= 30; time += windowSize) {
      const windowStart = testStartTime + (time * 1000);
      const windowEnd = windowStart + (windowSize * 1000);
      
      const clicksInWindow = logs.filter(log => 
        log.timestamp >= windowStart && log.timestamp < windowEnd
      ).length;
      
      frequencyData.push({
        time,
        frequency: clicksInWindow / windowSize
      });
    }
    
    return frequencyData;
  },

  saveMetrics: (m) => set({ lastMetrics: m }),
  reset: () => set({ logs: [], lastMetrics: null, testStartTime: null }),
}));
