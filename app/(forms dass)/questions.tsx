import QuestionnaireTemplate from "@/components/templates/QuestionnaireTemplate";
import { useQuestionStore } from "@/lib/stores/useFormDass";
import { dassQuestions } from "@/lib/questions/QuestionsDass";

export default function Questions() {
  const {
    perguntas,
    setResposta,
    incrementaClique,
    setTempo,
    setTempoResposta,
  } = useQuestionStore();

  // do 1 até 21
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
