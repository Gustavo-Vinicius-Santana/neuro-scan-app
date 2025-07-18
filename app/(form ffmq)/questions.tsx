import QuestionnaireTemplate from "@/components/templates/QuestionnaireTemplate";
import { useFfmqStore } from "@/lib/stores/useFormFfmq";
import { ffmqQuestions } from "@/lib/questions/QuestionsFfmq";

export default function Questions(){
    const {
        perguntas,
        setResposta,
        incrementaClique,
        setTempo,
        setTempoResposta,
    } = useFfmqStore();

    // do 1 até 39
    return(
        <QuestionnaireTemplate
            questions={ffmqQuestions}
            sensorKey="FFMQ"
            store={{
            respostas: perguntas,
            setResposta,
            incrementaClique,
            setTempo,
            setTempoResposta,
            }}
            finishRoute="/(form capc)/welcome"
        />
    )
}