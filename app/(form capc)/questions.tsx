import QuestionnaireTemplate from "@/components/templates/QuestionnaireTemplate";
import { useCapcStore } from "@/lib/stores/useFormCapc";

export default function Questions(){
    const {
        perguntas,
        setResposta,
        incrementaClique,
        setTempo,
        setTempoResposta,
    } = useCapcStore();

    // do 1 até 22
    const ffmqQuestions = [
        {
            text: "Eu consigo soluções para problemas através dos meus sonhos.",
            options: [
                { id: 1, label: "1 - Nunca" },
                { id: 2, label: "2 - Raramente" },
                { id: 3, label: "3 - Às vezes" },
                { id: 4, label: "4 - Frequentemente" },
                { id: 5, label: "5 - Sempre" },
            ],
        },
        {
            text: "Eu me reprovo quando tenho ideias irracionais.",
            options: [
                { id: 1, label: "1 - Nunca" },
                { id: 2, label: "2 - Raramente" },
                { id: 3, label: "3 - Às vezes" },
                { id: 4, label: "4 - Frequentemente" },
                { id: 5, label: "5 - Sempre" },
            ],
        },
    ]

    return(
        <QuestionnaireTemplate
            questions={ffmqQuestions}
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