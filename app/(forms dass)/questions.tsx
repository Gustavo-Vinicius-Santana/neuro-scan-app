import QuestionnaireTemplate from "@/components/templates/QuestionnaireTemplate";
import { useQuestionStore } from "@/lib/stores/useFormDass";

export default function Questions() {
  const {
    perguntas,
    setResposta,
    incrementaClique,
    setTempo,
    setTempoResposta,
  } = useQuestionStore();

  // do 1 até 21
  const dassQuestions = [
    {
      text: "Achei difícil me acalmar essa semana?",
      options: [
        { id: 1, label: "1 - Não aconteceu comigo essa semana" },
        { id: 2, label: "2 - Aconteceu comigo algumas vezes na semana" },
        { id: 3, label: "3 - Aconteceu comigo boa parte da semana" },
      ],
    },
    {
      text: "Senti que estava com muita tensão muscular.",
      options: [
        { id: 1, label: "1 - Não aconteceu comigo essa semana" },
        { id: 2, label: "2 - Aconteceu comigo algumas vezes na semana" },
        { id: 3, label: "3 - Aconteceu comigo boa parte da semana" },
      ],
    },
    {
      text: "Tive dificuldade para relaxar.",
      options: [
        { id: 1, label: "1 - Não aconteceu comigo essa semana" },
        { id: 2, label: "2 - Aconteceu comigo algumas vezes na semana" },
        { id: 3, label: "3 - Aconteceu comigo boa parte da semana" },
      ],
    },
    {
      text: "Preocupei-me com situações em que algo pudesse dar errado.",
      options: [
        { id: 1, label: "1 - Não aconteceu comigo essa semana" },
        { id: 2, label: "2 - Aconteceu comigo algumas vezes na semana" },
        { id: 3, label: "3 - Aconteceu comigo boa parte da semana" },
      ],
    },
    {
      text: "Senti que estava muito nervoso(a).",
      options: [
        { id: 1, label: "1 - Não aconteceu comigo essa semana" },
        { id: 2, label: "2 - Aconteceu comigo algumas vezes na semana" },
        { id: 3, label: "3 - Aconteceu comigo boa parte da semana" },
      ],
    },
  ];

  return (
    <QuestionnaireTemplate
      questions={dassQuestions}
      sensorKey="DASS"
      store={{
        respostas: perguntas,
        setResposta,
        incrementaClique,
        setTempo,
        setTempoResposta,
      }}
      finishRoute="/(form ffmq)/welcome"
    />
  );
}
