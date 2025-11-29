import { create } from "zustand";

export type StimType = "GO" | "NOGO";

export interface StimulusLog {
  stimulus: StimType;
  responded: boolean;
  correct: boolean;
  reactionTime?: number;
}

export interface GoNoGoMetrics {
  commissionErrorsPct: number;
  omissionErrorsPct: number;
  goAccuracyPct: number;
  meanRT: number;
  rtStdDev: number;
  meanNoGoLatency: number;
}

interface StoreState {
  logs: StimulusLog[];
  lastMetrics: GoNoGoMetrics | null;

  addStimulus: (stim: StimType) => void;

  registerResponse: (reactionTime?: number) => void;

  computeMetrics: () => GoNoGoMetrics;

  saveMetrics: (m: GoNoGoMetrics) => void;
  reset: () => void;
}

export const useGoNoGoStore = create<StoreState>((set, get) => ({
  logs: [],
  lastMetrics: null,

  /** Quando o estímulo aparece na tela */
  addStimulus: (stim) =>
    set((state) => ({
      logs: [
        ...state.logs,
        {
          stimulus: stim,
          responded: false,
          correct: false,
        },
      ],
    })),

  /** Quando o usuário toca na tela */
  registerResponse: (reactionTime) =>
    set((state) => {
      const updated = [...state.logs];
      const last = updated[updated.length - 1];

      if (!last) return { logs: updated };

      last.responded = reactionTime !== undefined;

      /** Lógica central:
       *
       * GO → deve tocar
       * NOGO → não deve tocar
       */
      if (last.stimulus === "GO") {
        last.correct = last.responded === true;
      } else {
        last.correct = last.responded === false;
      }

      if (reactionTime !== undefined) {
        last.reactionTime = reactionTime;
      }

      return { logs: updated };
    }),

  /** Cálculo das métricas */
  computeMetrics: () => {
    const logs = get().logs;

    const go = logs.filter((l) => l.stimulus === "GO");
    const nogo = logs.filter((l) => l.stimulus === "NOGO");

    // Erro de Comissão = tocou no NOGO
    const commissionErrors =
      nogo.filter((l) => l.responded).length / (nogo.length || 1);

    // Erro de Omissão = não tocou no GO
    const omissionErrors =
      go.filter((l) => !l.responded).length / (go.length || 1);

    // Acurácia GO
    const goAcc =
      go.filter((l) => l.correct).length / (go.length || 1);

    // Reaction Times corretos
    const rts =
      go
        .filter((l) => l.correct && l.reactionTime)
        .map((l) => l.reactionTime!) || [];

    const meanRT =
      rts.reduce((a, b) => a + b, 0) / (rts.length || 1);

    const rtStdDev =
      Math.sqrt(
        rts
          .map((x) => (x - meanRT) ** 2)
          .reduce((a, b) => a + b, 0) / (rts.length || 1)
      ) || 0;

    // Latência incorreta de NOGO (tocou quando não devia)
    const nogoLat =
      nogo
        .filter((l) => l.responded && l.reactionTime)
        .map((l) => l.reactionTime!) || [];

    const meanNoGoLatency =
      nogoLat.reduce((a, b) => a + b, 0) / (nogoLat.length || 1);

    return {
      commissionErrorsPct: commissionErrors * 100,
      omissionErrorsPct: omissionErrors * 100,
      goAccuracyPct: goAcc * 100,
      meanRT,
      rtStdDev,
      meanNoGoLatency,
    };
  },

  saveMetrics: (m) => set({ lastMetrics: m }),
  reset: () => set({ logs: [], lastMetrics: null }),
}));
