import { useContext } from "react";
import { RefetchContext } from "../context/RefetchContext";
const useRefetchContext = () => {
  const context = useContext(RefetchContext);
  if (!context) {
    throw Error("useRefetchContext must be used inside RefetchContextProvider");
  }
  return context;
};
export default useRefetchContext;
