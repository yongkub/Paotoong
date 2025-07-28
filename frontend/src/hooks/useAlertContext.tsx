import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw Error("useAlertContext must be use inside AlertContextProvider");
  }
  return context;
};

export default useAlertContext;
