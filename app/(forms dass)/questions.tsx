import QuestionnaireTemplate from "@/components/templates/QuestionnaireTemplate";
import { useQuestionStore } from "@/lib/stores/useFormDass";
import { dassQuestions } from "@/lib/questions/QuestionsDass";
import QuestionnaireTemplateZip from "@/components/templates/QuestionnaireTemplateZip";

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
    <QuestionnaireTemplateZip
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

      endpoint="http://localhost:3001/api/test-respostas"
    />
  );
}
