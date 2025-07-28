import { useState } from "react";
import useAuthContext from "./useAuthContext";
const useLogin = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError("");
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      try {
        const jsonErr = await response.json();
        setIsLoading(false);
        setError(jsonErr.error);
      } catch {
        setIsLoading(false);
        setError("Something went wrong :(");
      }
      return false;
    }
    const json = await response.json();

    dispatch({ type: "LOGIN", payload: json });
    localStorage.setItem("user", JSON.stringify(json));
    setIsLoading(false);
    return true;
  };

  return { error, isLoading, login };
};

export default useLogin;
