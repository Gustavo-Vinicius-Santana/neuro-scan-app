import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import OptionGroup from "@/components/groupButtons/OptionGroup";
import BtnForm from "@/components/buttons/btnForm";
import { useFfmqStore } from "@/store/useFormFfmq";

export default function FfmqQuestion1() {
  const router = useRouter();

  const questionIndex = 0;

  const { perguntas, setResposta, incrementaClique } = useFfmqStore();

  const questionData = perguntas[questionIndex];

  const options = [
    { id: 1, label: "1 - Nunca" },
    { id: 2, label: "2 - Às vezes" },
    { id: 3, label: "3 - Não tenho certeza" },
    { id: 4, label: "4 - Normalmente verdadeiro" },
    { id: 5, label: "5 - Quase sempre ou sempre verdadeiro" },
  ];

  const handleAnswer = (value: number) => {
    setResposta(questionIndex, value);
    incrementaClique(questionIndex, value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        1. Quando estou caminhando, eu deliberadamente percebo as sensações do meu corpo em movimento.
      </Text>

      <OptionGroup
        options={options}
        selected={questionData.resposta}
        onSelect={(id) => {
          handleAnswer(id);
        }}
      />

      <BtnForm
        title="Próxima"
        color="#10B981"
        onPress={() => router.push("/question2")}
        disabled={questionData.resposta === null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
});