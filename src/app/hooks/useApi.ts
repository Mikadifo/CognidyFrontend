import { useCallback, useState } from "react";

interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
}

export const useApi = <T, Args extends any[]>(
  apiRequest: (...args: Args) => Promise<ApiResponse<T>>,
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (...args: Args) => {
      setLoading(true);
      setMessage(null);
      setError(null);

      try {
        const res = await apiRequest(...args);

        if (res.error) {
          setError(res.error);
          setData(null);
        } else {
          setData(res.data ?? null);
          setMessage(res.message ?? null);
        }
      } catch (e: any) {
        setError(e.message ?? "Unexpected error");
      } finally {
        setLoading(false);
      }
    },
    [apiRequest],
  );

  const setDataState = setData as unknown as React.Dispatch<
    React.SetStateAction<T>
  >;

  return {
    loading,
    data,
    setData: setDataState,
    message,
    error,
    submit,
  };
};
