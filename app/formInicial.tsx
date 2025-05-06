import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Accelerometer } from 'expo-sensors';
import { useForm, SubmitHandler } from "react-hook-form";

import useInicialForm from "@/store/useInicialForm";
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

  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(200);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      setAcceleration({ x: x ?? 0, y: y ?? 0, z: z ?? 0 });
    });

    return () => subscription.remove();
  }, []);

  const { x, y, z } = acceleration;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setFormData(data);
    router.push("/(forms dass)/welcome");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.pageTitle}>Formulário Inicial</Text>

      <View style={{ width: "100%", maxWidth: 500 }}>

      <InputText
        label="Nome"
        placeholder="Seu nome"
        name="name"
        control={control}
        rules={{ required: true }}
      />

      <InputNumber
        label="Idade"
        placeholder="Sua idade"
        name="age"
        control={control}
        rules={{ required: true }}
        
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
        />

        <BtnForm         
        title="Enviar"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}/>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>Aceleração X: {x.toFixed(3)}</Text>
        <Text>Aceleração Y: {y.toFixed(3)}</Text>
        <Text>Aceleração Z: {z.toFixed(3)}</Text>
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
    color: "#2c3e50",
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