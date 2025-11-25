import QuestionnaireTemplate from "@/components/templates/QuestionnaireTemplate";
import { useCapcStore } from "@/lib/stores/useFormFfmq";
import { capcQuestions } from "@/lib/questions/QuestionsCapc";
import QuestionnaireTemplateDireto from "@/components/templates/QuestionnaireTemplateDireto";

export default function Questions(){
    const {
        perguntas,
        setResposta,
        incrementaClique,
        setTempo,
        setTempoResposta,
        resetResposta
    } = useCapcStore();

    // do 1 até 22
    return(
        <QuestionnaireTemplateDireto
            questions={capcQuestions}
            sensorKey="CAPC"
            store={{
            respostas: perguntas,
            setResposta,
            incrementaClique,
            setTempo,
            setTempoResposta,
            resetResposta
            }}
            finishRoute="/(results)/resultGeneral"
            endpoint="https://neuroscan-app.onrender.com/api/respostas/json"
        />
    )
}