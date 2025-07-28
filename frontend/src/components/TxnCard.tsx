import type { Dispatch, SetStateAction } from "react";
import "../css/Txn.css";
import type { TxnProps } from "../hooks/useFetchTxn";
import useDeleteTxn from "../hooks/useDeleteTxn";

export interface TxnCardProps extends TxnProps {
  setShowTxnModal: Dispatch<SetStateAction<boolean>>;
  setGlobalTxn: Dispatch<SetStateAction<TxnProps>>;
}
const TxnCard = (props: TxnCardProps) => {
  const { deleteTxn } = useDeleteTxn();

  const handleDelete = async () => {
    if (props._id) {
      await deleteTxn(props._id);
    }
  };
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
            <div
              className="sm-txt text-truncate"
              style={{ maxWidth: "max(80%,20ch)" }}
            >
              <i className="bi bi-pencil-fill"></i>
              {props.note}
            </div>
          )}
        </div>
        <div className="ms-auto text-end">
          <span className={props.isExpense ? "text-danger" : "text-success"}>
            {props.isExpense ? "-" : "+"} THB {props.amount.toLocaleString()}
          </span>
          <i
            className="bi bi-pencil-square ms-4 text-warning cursor-pointer"
            onClick={showTxnModal}
          ></i>
          <i
            className="bi bi-trash-fill text-danger ms-3 cursor-pointer"
            onClick={handleDelete}
          ></i>
        </div>
      </div>
    </>
  );
};

export default TxnCard;
