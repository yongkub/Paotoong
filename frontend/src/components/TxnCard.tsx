import type { Dispatch, SetStateAction } from "react";
import "../css/Txn.css";
import { type TxnProps } from "../pages/Home";

export interface TxnCardProps extends TxnProps {
  setShowTxnModal: Dispatch<SetStateAction<boolean>>;
  setGlobalTxn: Dispatch<SetStateAction<TxnProps>>;
}
const TxnCard = (props: TxnCardProps) => {
  const showTxnModal = () => {
    const { setShowTxnModal, setGlobalTxn, ...txn } = props;
    setGlobalTxn(txn);
    setShowTxnModal(true);
  };
  return (
    <>
      <div className="d-flex gap-2 w-100 align-items-center txncard">
        <div className="btn">
          <img
            src={`src/assets/category/${props.category
              .toLowerCase()
              .split("&")[0]
              .trim()}.svg`}
          />
        </div>
        <div className="txndet">
          <div>{props.category}</div>
          {props.label && <div className="label sm-txt">{props.label}</div>}
          {props.note && (
            <div className="sm-txt">
              <i className="bi bi-pencil-fill"></i>
              {props.note}
            </div>
          )}
        </div>
        <div className="ms-auto">
          <span className={props.isExpense ? "text-danger" : "text-success"}>
            {props.isExpense ? "-" : "+"} THB {props.amount}
          </span>
          <i
            className="bi bi-pencil-square ps-2 text-warning"
            onClick={showTxnModal}
          ></i>
        </div>
      </div>
    </>
  );
};

export default TxnCard;
