import type { TxnProps } from "./useFetchTxn";
import useAuthContext from "./useAuthContext";
import useLogout from "./useLogout";
import useRefetchContext from "./useRefetchContext";
import useAlertContext from "./useAlertContext";

const useUpdateTxn = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { triggerRefetch } = useRefetchContext();
  const { triggerAlert } = useAlertContext();
  const updateTxn = async (updatedTxn: TxnProps) => {
    if (!user) {
      logout();
      return;
    }
    const { _id, ...updatedBody } = updatedTxn;
    const response = await fetch(`/api/transaction/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(updatedBody),
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
    return true;
  };

  return { updateTxn };
};

export default useUpdateTxn;
