import type { TxnProps } from "./useFetchTxn";
import useAuthContext from "./useAuthContext";
import useLogout from "./useLogout";
import useRefetchContext from "./useRefetchContext";
import useAlertContext from "./useAlertContext";

const useAddTxn = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { triggerRefetch } = useRefetchContext();
  const { triggerAlert } = useAlertContext();
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
      try {
        const jsonErr = await response.json();
        triggerAlert(jsonErr.error);
      } catch {
        triggerAlert("");
      }
      return;
    }
    await response.json();
    triggerRefetch();
  };

  return { addNewTxn };
};

export default useAddTxn;
