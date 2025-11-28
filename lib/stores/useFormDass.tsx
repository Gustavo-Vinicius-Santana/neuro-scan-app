import { create } from 'zustand';

type Pergunta = {
  idGlobal: number;
  resposta: number | null;
  tempo: number;
  tempoResposta: number;
  cliqueResposta1: number;
  cliqueResposta2: number;
  cliqueResposta3: number;
  cliqueResposta4: number;
};

type StoreState = {
  perguntas: Pergunta[];
  setResposta: (index: number, resposta: number | null) => void;
  incrementaClique: (index: number, resposta: number) => void;
  setTempo: (index: number, tempo: number) => void;
  setTempoResposta: (index: number, tempoResposta: number) => void;
  resetResposta: (index: number, fullReset?: boolean) => void;
  reset: () => void;
};

const TOTAL = 21;

// IDs 1–21
const perguntaInicial = (id: number): Pergunta => ({
  idGlobal: id,
  resposta: null,
  tempo: 0,
  tempoResposta: 0,
  cliqueResposta1: 0,
  cliqueResposta2: 0,
  cliqueResposta3: 0,
  cliqueResposta4: 0,
});

export const useQuestionStore = create<StoreState>((set) => ({
  perguntas: Array.from({ length: TOTAL }, (_, i) => perguntaInicial(i + 61)),

  setResposta: (index, resposta) =>
    set((state) => {
      const perguntas = [...state.perguntas];
      perguntas[index] = { ...perguntas[index], resposta };
      return { perguntas };
    }),

  incrementaClique: (index, resposta) =>
    set((state) => {
      const perguntas = [...state.perguntas];
      const pergunta = perguntas[index];
      const field = `cliqueResposta${resposta}` as keyof Pergunta;

      perguntas[index] = {
        ...pergunta,
        [field]: (pergunta[field] as number) + 1,
      };

      return { perguntas };
    }),

  setTempo: (index, tempo) =>
    set((state) => {
      const perguntas = [...state.perguntas];
      perguntas[index] = { ...perguntas[index], tempo };
      return { perguntas };
    }),

  setTempoResposta: (index, tempoResposta) =>
    set((state) => {
      const perguntas = [...state.perguntas];
      perguntas[index] = { ...perguntas[index], tempoResposta };
      return { perguntas };
    }),

  resetResposta: (index) =>
    set((state) => {
      const perguntas = [...state.perguntas];
      perguntas[index].resposta = null;
      perguntas[index].tempoResposta = 0;
      return { perguntas };
    }),

  reset: () => ({
    perguntas: Array.from({ length: TOTAL }, (_, i) => perguntaInicial(i + 1)),
  }),
}));
