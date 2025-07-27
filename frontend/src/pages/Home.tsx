import { useEffect, useState } from "react";
import TxnCard from "../components/TxnCard";
import "../css/Home.css";
import TxnModal from "../components/TxnModal";
import { Tooltip } from "antd";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

export interface TxnProps {
  _id?: string;
  category: string;
  note?: string;
  amount: number;
  label?: string;
  date: Date;
  isExpense: boolean;
}
const Home = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [showTxnModal, setShowTxnModal] = useState(false);
  const [txns, setTxns] = useState([]);
  const [filtDate, setFiltDate] = useState(new Date());
  const fetchTxns = async () => {
    if (!user) {
      logout();
      return;
    }
    const response = await fetch(
      `/api/transaction?month=${
        filtDate.getMonth() + 1
      }&year=${filtDate.getFullYear()}`,
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

    const json = await response.json();
    setTxns(json);
  };

  useEffect(() => {
    fetchTxns();
  }, []);

  const iniTxn: TxnProps = {
    category: "Food & Drink",
    note: "",
    amount: 0,
    label: "",
    date: new Date(),
    isExpense: true,
  };
  const [globalTxn, setGlobalTxn] = useState<TxnProps>(iniTxn);
  const hideTxnModal = () => {
    setShowTxnModal(false);
  };
  return (
    <div className="container-fluid">
      <Tooltip placement="left" title={<span>Add New Transaction</span>}>
        <div
          className="position-fixed bottom-0 text-black rounded-circle bg-white translate-middle end-0"
          id="add-txn"
          onClick={() => setShowTxnModal(true)}
        >
          <i className="bi bi-plus"></i>
        </div>
      </Tooltip>
      <div className="row justify-content-center gap-3">
        <button className="btn rounded-pill btn-danger w-max-con">
          Spending Summary
        </button>
        {txns.length > 0 &&
          txns.map((txn: TxnProps, ind) => {
            return (
              <TxnCard
                key={ind}
                amount={txn.amount}
                category={txn.category}
                label={txn.label ?? ""}
                note={txn.note ?? ""}
                isExpense={txn.isExpense}
                date={txn.date}
                _id={txn._id}
                setGlobalTxn={setGlobalTxn}
                setShowTxnModal={setShowTxnModal}
              />
            );
          })}
        {txns.length == 0 && (
          <div className="text-center">No transaction yet</div>
        )}
      </div>
      {showTxnModal && (
        <TxnModal globalTxn={globalTxn} hideModal={hideTxnModal} />
      )}
    </div>
  );
};
export default Home;
