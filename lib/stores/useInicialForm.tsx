import { create } from "zustand";

interface FormData {
  name: string;
  age: string;
  email: string;
  renda: string;
  ocupacao: string;
  carga_horaria: string;
  escolaridade: string;
  sexo?: string;
  estado?: string;
}

interface FormState {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
}

const useInicialForm = create<FormState>((set) => ({
  formData: {
    name: "",
    age: "",
    email: "",
    renda: "",
    ocupacao: "",
    carga_horaria: "",
    escolaridade: "",
  },
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
}));

export default useInicialForm;