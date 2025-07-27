import { useState } from "react";
import TxnCard from "../components/TxnCard";
import "../css/Home.css";
import TxnModal from "../components/TxnModal";

export interface TxnProps {
  _id: string;
  category: string;
  note?: string;
  price: number;
  label?: string;
  date: Date;
  isExpense: boolean;
}
const Home = () => {
  const [showTxnModal, setShowTxnModal] = useState(false);
  const iniTxn: TxnProps = {
    _id: "0",
    category: "",
    note: "",
    price: 0,
    label: "",
    date: new Date(),
    isExpense: false,
  };
  const [globalTxn, setGlobalTxn] = useState<TxnProps>(iniTxn);
  const hideTxnModal = () => {
    setShowTxnModal(false);
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <button className="btn rounded-pill btn-danger w-max-con">
          Spending Summary
        </button>
        <TxnCard
          category="food"
          price={20}
          note=""
          label="yong"
          date={new Date()}
          setShowTxnModal={setShowTxnModal}
          setGlobalTxn={setGlobalTxn}
          _id={""}
          isExpense={true}
        />
      </div>
      {showTxnModal && (
        <TxnModal globalTxn={globalTxn} hideModal={hideTxnModal} />
      )}
    </div>
  );
};
export default Home;
