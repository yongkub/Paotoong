import useLogout from "./useLogout";
import useAuthContext from "./useAuthContext";
interface RawTxnProps {
  _id?: string;
  category: string;
  note?: string;
  amount: number;
  label?: string;
  date: string;
  isExpense: boolean;
}
export interface TxnProps {
  _id?: string;
  category: string;
  note?: string;
  amount: number;
  label?: string;
  date: Date;
  isExpense: boolean;
}
const useFetchTxn = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const fetchTxns = async (month: number, year: number) => {
    if (!user) {
      logout();
      return;
    }
    const response = await fetch(
      `/api/transaction?month=${month}&year=${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (response.status === 401) {
      logout();
      return;
    }

    if (!response.ok) {
      return;
    }

    const json: RawTxnProps[] = await response.json();
    const formattedJson: TxnProps[] = json.map((tx: RawTxnProps) => {
      return { ...tx, date: new Date(tx.date) };
    });
    return formattedJson;
  };

  return { fetchTxns };
};

export default useFetchTxn;
