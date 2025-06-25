import { create } from 'zustand';

type PerguntaCapc = {
  resposta: number | null;
  tempo: number;
  tempoResposta: number;
  cliqueResposta1: number;
  cliqueResposta2: number;
  cliqueResposta3: number;
  cliqueResposta4: number;
  cliqueResposta5: number;
};

type CapcStoreState = {
  perguntas: PerguntaCapc[];
  setResposta: (index: number, resposta: number) => void;
  incrementaClique: (index: number, resposta: number) => void;
  setTempo: (index: number, tempo: number) => void;
  setTempoResposta: (index: number, tempoResposta: number) => void;
  reset: () => void;
};

const TOTAL_PERGUNTAS_CAPC = 39;

const perguntaInicialCapc: PerguntaCapc = {
  resposta: null,
  tempo: 0,
  tempoResposta: 0,
  cliqueResposta1: 0,
  cliqueResposta2: 0,
  cliqueResposta3: 0,
  cliqueResposta4: 0,
  cliqueResposta5: 0,
};

export const useFfmqStore = create<CapcStoreState>((set) => ({
  perguntas: Array(TOTAL_PERGUNTAS_CAPC)
    .fill(null)
    .map(() => ({ ...perguntaInicialCapc })),

  setTempoResposta: (index, tempoResposta) => {
    set((state) => {
      const perguntas = [...state.perguntas];
      perguntas[index] = { ...perguntas[index], tempoResposta };
      return { perguntas };
    });
  },

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

      const fieldName = `cliqueResposta${resposta}` as keyof PerguntaCapc;
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
    perguntas: Array(TOTAL_PERGUNTAS_CAPC)
      .fill(null)
      .map(() => ({ ...perguntaInicialCapc })),
  }),
}));