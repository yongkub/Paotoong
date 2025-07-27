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

    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return false;
    }
    setIsLoading(false);
    dispatch({ type: "LOGIN", payload: json });
    localStorage.setItem("user", JSON.stringify(json));
    return true;
  };

  return { signup, error, isLoading };
};

export default useSignup;
