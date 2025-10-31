import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string | Record<string, string>;
}

export const useApi = <T, Args extends unknown[]>(
  apiRequest: (...args: Args) => Promise<ApiResponse<T>>,
) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | Record<string, string> | null>(
    null,
  );

  const submit = useCallback(
    async (...args: Args): Promise<ApiResponse<T>> => {
      setLoading(true);
      setMessage(null);
      setError(null);

      try {
        const res = await apiRequest(...args);

        if (res.error) {
          setError(res.error ?? "Unexpected error");
          setData(null);
        } else {
          setData(res.data ?? null);
          setMessage(res.message ?? null);
        }

        return res;
      } catch (e: unknown) {
        if (e === "UNPROCESSABLE ENTITY") {
          router.push("/login");
        }

        let err: string | Record<string, string> = "Unexpected error";

        if (e instanceof Error) {
          err = e.message ?? "Unexpected error";
        } else if (typeof e === "object" && e !== null) {
          err = e as Record<string, string>;
        } else {
          err = String(e);
        }

        setError(err);

        return { error: err };
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
