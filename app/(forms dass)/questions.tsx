import { useQuestionStore } from "@/lib/stores/useFormDass";
import { dassQuestions } from "@/lib/questions/QuestionsDass";
import QuestionnaireTemplateZip from "@/components/templates/QuestionnaireTemplateZip";
import QuestionnaireTemplateDireto from "@/components/templates/QuestionnaireTemplateDireto";
import { useEffect } from "react";

export default function Questions() {
  const api = process.env.EXPO_PUBLIC_API_URL;

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
      initialId={61}
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
      endpoint={`${api}api/respostas/json`} 
    />
  );
}

