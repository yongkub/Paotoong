import { createContext, useState, type ReactNode } from "react";
import Alert from "../components/Alert";

export const AlertContext = createContext({
  triggerAlert: (_: string) => {},
});

export const AlertContextProvider = ({ children }: { children: ReactNode }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("Something went wrong :(");
  const triggerAlert = (msg: string) => {
    setAlertMsg(msg || "Something went wrong :(");
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <AlertContext.Provider value={{ triggerAlert }}>
      {showAlert && <Alert msg={alertMsg} closeAlert={closeAlert} />}
      {children}
    </AlertContext.Provider>
  );
};
