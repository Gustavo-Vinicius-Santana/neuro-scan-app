import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import OptionGroup from "@/components/groupButtons/OptionGroup";
import BtnForm from "@/components/buttons/btnForm";

export default function FFMQQuestion1() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const options = [
    { id: 1, label: "1 - Nunca" },
    { id: 2, label: "2 - Às vezes" },
    { id: 3, label: "3 - Não tenho certeza" },
    { id: 4, label: "4 - Normalmente verdadeiro" },
    { id: 5, label: "5 - Quase sempre ou sempre verdadeiro" },
  ];

  const handleAnswer = (value: number) => {
    console.log("Resposta selecionada:", value);
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        1. Quando estou caminhando, eu deliberadamente percebo as sensações do
        meu corpo em movimento.
      </Text>

      <OptionGroup
        options={options}
        selected={selectedOption}
        onSelect={(id) => {
          setSelectedOption(id);
          handleAnswer(id);
        }}
      />

      <BtnForm
        title="Próxima"
        onPress={() => router.push("/question2")}
        disabled={selectedOption === null}
        color="#10B981" // verde
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