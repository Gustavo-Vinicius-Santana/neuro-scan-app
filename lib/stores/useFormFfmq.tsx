import { create } from 'zustand';

type PerguntaFfmq = {
  idGlobal: number;
  resposta: number | null;
  tempo: number;
  tempoResposta: number;
  cliqueResposta1: number;
  cliqueResposta2: number;
  cliqueResposta3: number;
  cliqueResposta4: number;
  cliqueResposta5: number;
};

type FfmqStoreState = {
  perguntas: PerguntaFfmq[];
  setResposta: (index: number, resposta: number | null) => void;
  incrementaClique: (index: number, resposta: number) => void;
  setTempo: (index: number, tempo: number) => void;
  setTempoResposta: (index: number, tempoResposta: number) => void;
  resetResposta: (index: number, fullReset?: boolean) => void;
  reset: () => void;
};

const TOTAL_PERGUNTAS_FFMQ = 39;

// IDs globais: 22 a 60
const criaPerguntaInicial = (id: number): PerguntaFfmq => ({
  idGlobal: id,
  resposta: null,
  tempo: 0,
  tempoResposta: 0,
  cliqueResposta1: 0,
  cliqueResposta2: 0,
  cliqueResposta3: 0,
  cliqueResposta4: 0,
  cliqueResposta5: 0,
});

export const useFfmqStore = create<FfmqStoreState>((set) => ({
  perguntas: Array.from(
    { length: TOTAL_PERGUNTAS_FFMQ },
    (_, i) => criaPerguntaInicial(82 + i)
  ),

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

      const field = `cliqueResposta${resposta}` as keyof PerguntaFfmq;

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

  resetResposta: (index, fullReset = false) =>
    set((state) => {
      const perguntas = [...state.perguntas];

      if (fullReset) {
        // mantém o mesmo idGlobal ao resetar
        const id = perguntas[index].idGlobal;
        perguntas[index] = criaPerguntaInicial(id);
      } else {
        perguntas[index] = {
          ...perguntas[index],
          resposta: null,
          tempoResposta: 0,
        };
      }

      return { perguntas };
    }),

  reset: () => ({
    perguntas: Array.from(
      { length: TOTAL_PERGUNTAS_FFMQ },
      (_, i) => criaPerguntaInicial(22 + i)
    ),
  }),
}));
