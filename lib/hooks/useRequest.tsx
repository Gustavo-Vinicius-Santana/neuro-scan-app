import { useState } from "react";

interface RequestState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useRequest<T = any, R = any>() {
  const [state, setState] = useState<RequestState<R>>({
    data: null,
    error: null,
    loading: false,
  });

  async function post(url: string, body: T, token?: string) {
    try {
      setState({ data: null, error: null, loading: true });

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Erro ao enviar requisição");
      }

      const json = (await res.json()) as R;
      setState({ data: json, error: null, loading: false });
      return json;
    } catch (err: any) {
      setState({ data: null, error: err.message, loading: false });
      throw err;
    }
  }

  return { ...state, post };
}