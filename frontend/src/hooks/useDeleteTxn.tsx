import useAlertContext from "./useAlertContext";
import useAuthContext from "./useAuthContext";
import useLogout from "./useLogout";
import useRefetchContext from "./useRefetchContext";

const useDeleteTxn = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { triggerRefetch } = useRefetchContext();
  const { triggerAlert } = useAlertContext();
  const deleteTxn = async (_id: string): Promise<boolean> => {
    if (!user) {
      logout();
      return false;
    }
    const response = await fetch(`/api/transaction/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.status === 401) {
      logout();
      return false;
    }

    if (!response.ok) {
      try {
        const jsonErr = await response.json();
        triggerAlert(jsonErr.error);
      } catch {
        triggerAlert("");
      }
      return false;
    }

    const success: boolean = await response.json();
    triggerRefetch();
    return success;
  };

  return { deleteTxn };
};

export default useDeleteTxn;
