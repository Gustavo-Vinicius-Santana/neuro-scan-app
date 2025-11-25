import QuestionnaireTemplate from "@/components/templates/QuestionnaireTemplate";
import { useFfmqStore } from "@/lib/stores/useFormFfmq";
import { ffmqQuestions } from "@/lib/questions/QuestionsFfmq";
import QuestionnaireTemplateDireto from "@/components/templates/QuestionnaireTemplateDireto";

export default function Questions(){
    const {
        perguntas,
        setResposta,
        incrementaClique,
        setTempo,
        setTempoResposta,
        resetResposta
    } = useFfmqStore();

    // do 1 até 39
    return(
        <QuestionnaireTemplateDireto
            initialId={82}
            questions={ffmqQuestions}
            sensorKey="FFMQ"
            store={{
            respostas: perguntas,
            setResposta,
            incrementaClique,
            setTempo,
            setTempoResposta,
            resetResposta
            }}
            finishRoute="/(form capc)/welcome"
            endpoint="https://neuroscan-app.onrender.com/api/respostas/json"
        />
    )
}