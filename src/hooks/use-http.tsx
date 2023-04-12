import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";

const useHttp = () => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (
      requestConfig: {
        url: string;
        method?: string | null;
        headers?: { "Content-Type"?: string; token?: string } | null;
        body?: {} | null;
      },
      applyData: (data: any) => void,
      errorFunction?: (data: any) => void
    ) => {
      setIsLoading(true);
      setError(null);

      if (requestConfig.headers) {
        requestConfig.headers["token"] = authCtx.token;
      } else {
        requestConfig["headers"] = {
          token: authCtx.token,
        };
      }

      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();

        applyData(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
        if (errorFunction) {
          errorFunction(err);
        }
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
