import QuestionnaireTemplate from "@/components/templates/QuestionnaireTemplate";
import { useQuestionStore } from "@/lib/stores/useFormDass";
import { dassQuestions } from "@/lib/questions/QuestionsDass";
import QuestionnaireTemplateZip from "@/components/templates/QuestionnaireTemplateZip";
import QuestionnaireTemplateDireto from "@/components/templates/QuestionnaireTemplateDireto";

export default function Questions() {
  const {
    perguntas,
    setResposta,
    incrementaClique,
    setTempo,
    setTempoResposta,
    resetResposta,
  } = useQuestionStore();

  return (
    <QuestionnaireTemplateDireto
      questions={dassQuestions}
      sensorKey="DASS"
      store={{
        respostas: perguntas,
        setResposta,
        incrementaClique,
        setTempo,
        setTempoResposta,
        resetResposta,
      }}
      finishRoute="/(form ffmq)/welcome"
      endpoint="https://neuroscan-app.onrender.com/api/respostas/json"
    />
  );
}

