import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import OptionGroup from "@/components/groupButtons/OptionGroup";
import BtnForm from "@/components/buttons/btnForm";

export default function CAPCQuestion1() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const options = [
    { id: 1, label: "1 - Nunca" },
    { id: 2, label: "2 - Raramente" },
    { id: 3, label: "3 - Às vezes" },
    { id: 4, label: "4 - Frequentemente" },
    { id: 5, label: "5 - Sempre" },
  ];

  const handleAnswer = (value: number) => {
    console.log("Resposta selecionada:", value);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        1. Eu consigo soluções para problemas através dos meus sonhos.
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
        color="#3B82F6" // azul
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