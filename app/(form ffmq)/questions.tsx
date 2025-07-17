import QuestionnaireTemplate from "@/components/templates/QuestionnaireTemplate";
import { useFfmqStore } from "@/lib/stores/useFormFfmq";

export default function Questions(){
    const {
        perguntas,
        setResposta,
        incrementaClique,
        setTempo,
        setTempoResposta,
    } = useFfmqStore();

    // do 1 até 39
    const ffmqQuestions = [
        {
            text: "Quando estou caminhando, eu deliberadamente percebo as sensações do meu corpo em movimento.",
            options: [
                { id: 1, label: "1 - Nunca" },
                { id: 2, label: "2 - Às vezes" },
                { id: 3, label: "3 - Não tenho certeza" },
                { id: 4, label: "4 - Normalmente verdadeiro" },
                { id: 5, label: "5 - Quase sempre ou sempre verdadeiro" },
            ],
        },
        {
            text: "Eu me reprovo quando tenho ideias irracionais.",
            options: [
                { id: 1, label: "1 - Nunca" },
                { id: 2, label: "2 - Às vezes" },
                { id: 3, label: "3 - Não tenho certeza" },
                { id: 4, label: "4 - Normalmente verdadeiro" },
                { id: 5, label: "5 - Quase sempre ou sempre verdadeiro" },
            ],
        },
    ]

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