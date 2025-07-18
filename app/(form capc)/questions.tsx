import QuestionnaireTemplate from "@/components/templates/QuestionnaireTemplate";
import { useCapcStore } from "@/lib/stores/useFormCapc";
import { capcQuestions } from "@/lib/questions/QuestionsCapc";

export default function Questions(){
    const {
        perguntas,
        setResposta,
        incrementaClique,
        setTempo,
        setTempoResposta,
    } = useCapcStore();

    // do 1 até 22
    return(
        <QuestionnaireTemplate
            questions={capcQuestions}
            sensorKey="CAPC"
            store={{
            respostas: perguntas,
            setResposta,
            incrementaClique,
            setTempo,
            setTempoResposta,
            }}
            finishRoute="/(results)/resultGeneral"
        />
    )
}