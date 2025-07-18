import { useRouter } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useMemo } from "react";

import useInicialForm from "@/lib/stores/useInicialForm";
import InputText from "@/components/inputs/InputText";
import InputNumber from "@/components/inputs/InputNumber";
import BtnForm from "@/components/buttons/btnForm";
import SelectDropdown from "@/components/dropdowns/selectDropdown";
import RadioGroup from "@/components/groupButtons/RadioGroup";
import { ISelectItem } from "rn-custom-select-dropdown";

import SearchableDropdown from "@/components/dropdowns/searchDropdown";

type FormData = {
  name: string;
  age: string;
  email: string;
  renda: string;
  ocupacao: string;
  carga_horaria: string;
  tratamentoDetalhe: string;
  medicacaoDetalhe: string;
  estadoCivil: string;
};

export default function FormInicial() {
  const router = useRouter();
  const { setFormData } = useInicialForm();

  const [selectedSexo, setSelectedSexo] = useState<ISelectItem<string> | null>(null);
  const [selectedEstado, setSelectedEstado] = useState<ISelectItem<string> | null>(null);
  const [selectedEscolaridade, setSelectedEscolaridade] = useState<ISelectItem<string> | null>(null);
  const [selectedTratamento, setSelectedTratamento] = useState<ISelectItem<string> | null>(null);
  const [selecteMedica, setSelectedMedica] = useState<ISelectItem<string> | null>(null);
  const [ selectedEstadoCivil, setSelectedEstadoCivil] = useState<ISelectItem<string> | null>(null);
  const [tratamentoDetalhe, setTratamentoDetalhe] = useState("");
  const [medicaDetalhe, setMedicaDetalhe] = useState("");

  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<FormData>({
    mode: "onChange",
  });

  const isCustomValid = useMemo(() => {
    return (
      selectedSexo !== null &&
      selectedEstado !== null &&
      selectedEscolaridade !== null &&
      selectedTratamento !== null &&
      selecteMedica !== null &&
      selectedEstadoCivil !== null
    );
  }, [selectedSexo, selectedEstado, selectedEscolaridade, selectedTratamento, selecteMedica, selectedEstadoCivil]);

  const isAllValid = isValid && isCustomValid;

  const goToDass: SubmitHandler<FormData> = (data) => {
    setFormData({
      ...data,
      sexo: selectedSexo?.value,
      estado: selectedEstado?.value,
      escolaridade: selectedEscolaridade?.value,
    });
    router.push("/(forms dass)/welcome");
  };

  const goToFfmq = () => router.push("/(form ffmq)/welcome");
  const goToCapc = () => router.push("/(form capc)/welcome");
  const goToResults = () => router.push("/(results)/resultGeneral");

  const sexo = [
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
    { label: "Outro", value: "outro" },
  ];

  const escolaridade = [
    { label: "Ensino Fundamental", value: "ensino fundamental" },
    { label: "Ensino Medio", value: "ensino medio" },
    { label: "Ensino Superior", value: "ensino superior" },
  ];

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

  const option = [
    { label: "Sim", value: "sim" },
    { label: "Nao", value: "nao" },
  ];

  const estadosCivil = [
    { label: "Solteiro", value: "solteiro" },
    { label: "Casado", value: "casado" },
    { label: "Divorciado", value: "divorciado" },
    { label: "Viuvo", value: "viuvo" },
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

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", zIndex: 1 }}>
          <InputNumber
            label="Idade"
            placeholder="Sua idade"
            name="age"
            control={control}
            rules={{ required: true }}
            iconName="calendar"
            width="48%"
          />

          <SelectDropdown
            label="Sexo"
            placeholder="Selecione seu sexo"
            items={sexo}
            value={selectedSexo}
            onChange={setSelectedSexo}
            width="48%"
          />
        </View>

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

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", zIndex: 1 }} >
          <InputNumber
            label="Renda mensal"
            placeholder="Informe sua renda"
            name="renda"
            control={control}
            rules={{ required: true }}
            iconName="cash"
            width="48%"
          />

          <SelectDropdown
            label="Estado civil"
            placeholder="Selecione o estado civil"
            items={estadosCivil}
            value={selectedEstadoCivil}
            onChange={setSelectedEstadoCivil}
            width="48%"
          />
        </View>

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

        <View style={{ zIndex: 9, marginBottom: 20 }}>
          <SelectDropdown
            label="Escolaridade"
            placeholder="Selecione sua escolaridade"
            items={escolaridade}
            value={selectedEscolaridade}
            onChange={setSelectedEscolaridade}
          />
        </View>

        <SearchableDropdown
          label="Estados"
          data={estados}
          onChange={setSelectedEstado}
          placeholder="Digite para buscar..."
        />

        <View style={{  alignItems: "center"}}>   
          <RadioGroup
            label="Faz tratamento psicologico?"
            options={option}
            value={selectedTratamento?.value ?? null}
            onChange={(newValue) => {
              const item = option.find((s) => s.value === newValue) || null;
              setSelectedTratamento(item);
              if (newValue !== "sim") setTratamentoDetalhe("");
            }}
            horizontal
          />
          {selectedTratamento?.value === "sim" && (
            <InputText
              placeholder="Digite qual tratamento"
              name="tratamentoDetalhe"
              control={control}
              rules={{ required: true }}
              iconName="help-circle"
              width="50%"
            />
          )}
        </View>

        <View style={{  alignItems: "center"}}>
          <RadioGroup
            label="Toma alguma medicação psiquiatrica?"
            options={option}
            value={selecteMedica?.value ?? null}
            onChange={(newValue) => {
              const item = option.find((s) => s.value === newValue) || null;
              setSelectedMedica(item);
              if (newValue !== "sim") setMedicaDetalhe("");
            }}
            horizontal
          />
          {selecteMedica?.value === "sim" && (
            <InputText
              placeholder="Digite qual medicação"
              name="medicacaoDetalhe"
              control={control}
              rules={{ required: true }}
              iconName="help-circle"
              width="50%"
            />
          )}
        </View>

        <View style={{ alignItems: "center" }}>
          <BtnForm title="Ir para formulario Dass-21" onPress={handleSubmit(goToDass)} disabled={!isAllValid} />
          <BtnForm title="Ir para formulario FFMQ" onPress={handleSubmit(goToFfmq)} disabled={!isAllValid} />
          <BtnForm title="Ir para formulario Capc" onPress={handleSubmit(goToCapc)} disabled={!isAllValid} />
          <BtnForm title="Ir para resultados" onPress={handleSubmit(goToResults)} disabled={!isAllValid} />
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
    paddingTop: 25,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0839A2",
    marginBottom: 10,
    textAlign: "center",
  },
});