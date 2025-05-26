import { create } from 'zustand';

type Pergunta = {
  resposta: number | null;
  tempo: number;
  cliqueResposta1: number;
  cliqueResposta2: number;
  cliqueResposta3: number;
};

type StoreState = {
  perguntas: Pergunta[];
  setResposta: (index: number, resposta: number) => void;
  incrementaClique: (index: number, resposta: number) => void;
  setTempo: (index: number, tempo: number) => void;
  reset: () => void;
};

const TOTAL_PERGUNTAS = 21;

const perguntaInicial: Pergunta = {
  resposta: null,
  tempo: 0,
  cliqueResposta1: 0,
  cliqueResposta2: 0,
  cliqueResposta3: 0,
};

export const useQuestionStore = create<StoreState>((set) => ({
  perguntas: Array(TOTAL_PERGUNTAS).fill(null).map(() => ({ ...perguntaInicial })),

  setResposta: (index, resposta) => {
    set((state) => {
      const perguntas = [...state.perguntas];
      perguntas[index] = { ...perguntas[index], resposta };
      return { perguntas };
    });
  },

  incrementaClique: (index, resposta) => {
    set((state) => {
      const perguntas = [...state.perguntas];
      const pergunta = perguntas[index];

      const fieldName = `cliqueResposta${resposta}` as keyof Pergunta;
      if (!(fieldName in pergunta)) return state;

      perguntas[index] = {
        ...pergunta,
        [fieldName]: (pergunta[fieldName] as number) + 1,
      };
      return { perguntas };
    });
  },

  setTempo: (index, tempo) => {
    set((state) => {
      const perguntas = [...state.perguntas];
      perguntas[index] = { ...perguntas[index], tempo };
      return { perguntas };
    });
  },

  reset: () => ({
    perguntas: Array(TOTAL_PERGUNTAS).fill(null).map(() => ({ ...perguntaInicial })),
  }),
}));