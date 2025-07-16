import { useRouter } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";

import useInicialForm from "@/lib/stores/useInicialForm";
import InputText from "@/components/inputs/InputText";
import InputNumber from "@/components/inputs/InputNumber";
import BtnForm from "@/components/buttons/btnForm";
import Select, { ISelectItem } from "rn-custom-select-dropdown";
import SelectDropdown from "@/components/selectDropdown/selectDropdown";
import { useState } from "react";

type FormData = {
  name: string;
  age: string;
  email: string;
  renda: string;
  ocupacao: string;
  carga_horaria: string;
  escolaridade: string;
  sexo?: string;
  estado?: string;
};

export default function FormInicial() {
  const router = useRouter();
  const { setFormData } = useInicialForm();

  const [selectedSexo, setSelectedSexo] = useState<ISelectItem<string> | null>(null);
  const [selectedEstado, setSelectedEstado] = useState<ISelectItem<string> | null>(null);

  const { control, handleSubmit, formState: { isValid } } = useForm<FormData>();

  const goToDass: SubmitHandler<FormData> = (data) => {
    setFormData(data);
    router.push("/(forms dass)/welcome");
  };

  const goToFfmq = () => router.push("/(form ffmq)/welcome");
  const goToCapc = () => router.push("/(form capc)/welcome");
  const goToResults = () => router.push("/(results)/resultGeneral");

  const sexo = [
    { label: "Masculino", value: "masculino"},
    { label: "Feminino", value: "feminino"},
  ]

  const estados: Array<ISelectItem<string>> = [
    { label: "Acre", value: "AC" },
    { label: "Alagoas", value: "AL" },
    { label: "Amapá", value: "AP" },
    { label: "Amazonas", value: "AM" },
    { label: "Bahia", value: "BA" },
    { label: "Ceará", value: "CE" },
    { label: "Distrito Federal", value: "DF" },
    { label: "Espírito Santo", value: "ES" },
    { label: "Goiás", value: "GO" },
    { label: "Maranhão", value: "MA" },
    { label: "Mato Grosso", value: "MT" },
    { label: "Mato Grosso do Sul", value: "MS" },
    { label: "Minas Gerais", value: "MG" },
    { label: "Pará", value: "PA" },
    { label: "Paraíba", value: "PB" },
    { label: "Paraná", value: "PR" },
    { label: "Pernambuco", value: "PE" },
    { label: "Piauí", value: "PI" },
    { label: "Rio de Janeiro", value: "RJ" },
    { label: "Rio Grande do Norte", value: "RN" },
    { label: "Rio Grande do Sul", value: "RS" },
    { label: "Rondônia", value: "RO" },
    { label: "Roraima", value: "RR" },
    { label: "Santa Catarina", value: "SC" },
    { label: "São Paulo", value: "SP" },
    { label: "Sergipe", value: "SE" },
    { label: "Tocantins", value: "TO" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Cadastro</Text>

      <ScrollView style={{ width: "100%", maxWidth: 500 }}>

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

        <InputNumber
          label="Renda mensal"
          placeholder="Informe sua renda"
          name="renda"
          control={control}
          rules={{ required: true }}
          iconName="cash"
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <InputText
            width="48%"
            label="Ocupação"
            placeholder="Sua ocupação"
            name="ocupacao"
            control={control}
            rules={{ required: true }}
            iconName="briefcase"
          />

          <InputNumber
            width="48%"
            label="Carga horária (horas)"
            placeholder="Sua carga horária"
            name="carga_horaria"
            control={control}
            rules={{ required: true }}
            iconName="time"
          />
        </View>

        <InputText
          label="Escolaridade"
          placeholder="Informe sua escolaridade"
          name="escolaridade"
          control={control}
          rules={{ required: true }}
          iconName="school"
        />

        <View style={{ zIndex: 10, marginBottom: 20 }}>
          <SelectDropdown 
            label="Sexo"
            placeholder="Selecione seu sexo"
            items={sexo} 
            value={selectedSexo}
            onChange={setSelectedSexo}        
          />
        </View>

        <View style={{ zIndex: 9, marginBottom: 20 }}>
          <SelectDropdown 
            label="Estado"
            placeholder="Selecione seu estado"
            items={estados}
            value={selectedEstado}
            onChange={setSelectedEstado}
          />
        </View>

        <View style={{ alignItems: "center" }}>
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
      </ScrollView>
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