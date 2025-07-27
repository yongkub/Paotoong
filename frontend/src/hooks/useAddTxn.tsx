import { type TxnProps } from "../pages/Home";
import useAuthContext from "./useAuthContext";
import useLogout from "./useLogout";

const useAddTxn = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const addNewTxn = async (newTxn: TxnProps) => {
    if (!user) {
      logout();
      return;
    }
    const response = await fetch("/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newTxn),
    });

    if (response.status === 401) {
      logout();
      return;
    }

    if (!response.ok) {
      //will show modal later
      return;
    }
  };

  return { addNewTxn };
};

export default useAddTxn;
