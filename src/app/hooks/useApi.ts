import { useCallback, useState } from "react";

interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
}

export const useApi = <T, Args extends unknown[]>(
  apiRequest: (...args: Args) => Promise<ApiResponse<T>>,
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (...args: Args): Promise<ApiResponse<T>> => {
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

        return res;
      } catch (e: unknown) {
        let errMsg: string = "";

        if (e instanceof Error) {
          errMsg = e.message ?? "Unexpected error";
        }

        setError(errMsg);

        return { error: errMsg };
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
