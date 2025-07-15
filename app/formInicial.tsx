import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Accelerometer } from 'expo-sensors';
import { useForm, SubmitHandler } from "react-hook-form";

import useInicialForm from "@/lib/stores/useInicialForm";
import InputText from "@/components/inputs/InputText";
import InputNumber from "@/components/inputs/InputNumber";
import BtnForm from "@/components/buttons/btnForm";

type FormData = {
  name: string;
  age: string;
  email: string;
};

export default function FormInicial() {
  const router = useRouter();
  const { setFormData } = useInicialForm();

  const { control, handleSubmit, formState: { isValid } } = useForm<FormData>();

  const goToDass: SubmitHandler<FormData> = (data) => {
    setFormData(data);
  
    router.push("/(forms dass)/welcome");
  };

  const goToFfmq = () => {
    router.push("/(form ffmq)/welcome");
  };

  const goToCapc = () => {
    router.push("/(form capc)/welcome");
  };

  const goToResults = () => {
    router.push("/(results)/resultGeneral");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.pageTitle}>Cadastro</Text>

      <View style={{ width: "100%", maxWidth: 500 }}>

      <InputText
        label="Nome"
        placeholder="Nome"
        name="name"
        control={control}
        rules={{ required: true }}
        iconName="person"
      />

        <InputNumber
          label="Idade"
          placeholder="Sua idade"
          name="age"
          control={control}
          rules={{ required: true }}
          iconName="calendar"
        />

        <InputText
          label="Email"
          placeholder="Seu email"
          name="email"
          control={control}
          rules={{ 
            required: true, 
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Digite um email válido",
            },
          }}
          iconName="mail"
        />

          <View style={{alignItems: "center"}}>
            <BtnForm         
              title="Ir para formulario Dass-21"
              onPress={handleSubmit(goToDass)}
              disabled={!isValid}
            />

            <BtnForm         
              title="Ir para formulario FFMQ"
              onPress={handleSubmit(goToFfmq)}
              disabled={!isValid}
            />

            <BtnForm         
              title="Ir para formulario Capc"
              onPress={handleSubmit(goToCapc)}
              disabled={!isValid}
            />

            <BtnForm         
              title="Ir para resultados"
              onPress={handleSubmit(goToResults)}
              disabled={!isValid}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  pageTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#0839A2",
      marginBottom: 30,
      textAlign: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});