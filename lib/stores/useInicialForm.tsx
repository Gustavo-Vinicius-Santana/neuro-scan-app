import { create } from "zustand";

interface FormData {
  name: string;
  age: string;
  email: string;
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
  },
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
}));

export default useInicialForm;