import { useState } from "react";
import type { TxnProps } from "../pages/Home";
import Category from "./Category";
import useAddTxn from "../hooks/useAddTxn";
import "../css/Txn.css";

const TxnModal = ({
  globalTxn,
  hideModal,
}: {
  globalTxn: TxnProps;
  hideModal: () => void;
}) => {
  const [editingTxn, setEditingTxn] = useState(globalTxn);

  const { addNewTxn } = useAddTxn();

  const handlePropsChange = (field: keyof TxnProps, newValue: any) => {
    setEditingTxn((prev) => ({ ...prev, [field]: newValue }));
  };

  const handleSaveChanges = () => {
    hideModal();
  };

  const setEditingCat = (newCatName: string, newCatIsExpense: boolean) => {
    setEditingTxn((prev) => ({
      ...prev,
      category: newCatName,
      isExpense: newCatIsExpense,
    }));
  };

  const handleAddTxn = async () => {
    await addNewTxn(editingTxn);
    hideModal();
  };

  return (
    <div className="txn-bd">
      <div className="px-3 py-2 rounded-4 txn-modal">
        <Category
          category={editingTxn.category}
          setEditingCat={setEditingCat}
        />
        <div className="wrap">
          <i className="bi bi-calendar-minus-fill"></i>
          <input
            type="date"
            value={
              editingTxn.date?.toISOString().split("T")[0] ||
              new Date().toISOString().split("T")[0]
            }
            onChange={(e) => handlePropsChange("date", e.target.value)}
          />
        </div>
        <div className="wrap">
          <i className="bi bi-currency-bitcoin"></i>
          <input
            type="number"
            placeholder="Amount"
            value={editingTxn.amount || ""}
            onChange={(e) => handlePropsChange("amount", e.target.value)}
          />
          <span className="sm-txt ms-1">THB</span>
        </div>

        <div className="wrap">
          <i className="bi bi-tag-fill"></i>
          <input
            type="text"
            placeholder="label"
            value={editingTxn.label ?? ""}
            onChange={(e) => handlePropsChange("label", e.target.value)}
          />
        </div>
        <div className="wrap">
          <i className="bi bi-pencil-fill"></i>
          <input
            type="text"
            value={editingTxn.note ?? ""}
            placeholder="Write a note"
            onChange={(e) => handlePropsChange("note", e.target.value)}
          />
        </div>
        <div className="w-100 text-center">
          <button
            onClick={editingTxn._id ? handleSaveChanges : handleAddTxn}
            className="btn btn-success act-btn"
          >
            {editingTxn._id ? "Add Transaction" : "Save Changes"}
          </button>
          <button onClick={hideModal} className="btn btn-danger ms-2 act-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default TxnModal;
