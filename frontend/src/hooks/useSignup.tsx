import { useState } from "react";
import useAuthContext from "./useAuthContext";
const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (
    username: string,
    password: string,
    confirm: string
  ) => {
    setIsLoading(true);
    setError("");
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, confirm }),
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
    setIsLoading(false);
    dispatch({ type: "LOGIN", payload: json });
    localStorage.setItem("user", JSON.stringify(json));
    return true;
  };

  return { signup, error, isLoading };
};

export default useSignup;
