import { useEffect, useState } from "react";
import type { TxnProps } from "../hooks/useFetchTxn";
import Category from "./Category";
import useAddTxn from "../hooks/useAddTxn";
import "../css/Txn.css";
import DatePicker from "./DatePicker";
import useUpdateTxn from "../hooks/useUpdateTxn";

const TxnModal = ({
  globalTxn,
  hideModal,
}: {
  globalTxn: TxnProps;
  hideModal: () => void;
}) => {
  const [editingTxn, setEditingTxn] = useState<TxnProps>(globalTxn);

  useEffect(() => {
    setEditingTxn(globalTxn);
  }, [globalTxn]);

  const { addNewTxn } = useAddTxn();
  const { updateTxn } = useUpdateTxn();

  const handlePropsChange = (field: keyof TxnProps, newValue: any) => {
    setEditingTxn((prev) => ({ ...prev, [field]: newValue }));
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

  const handleSaveChanges = async () => {
    await updateTxn(editingTxn);
    hideModal();
  };

  return (
    <div className="txn-bd">
      <div className="px-3 py-2 rounded-4 txn-modal">
        <Category
          category={editingTxn.category}
          isCatExpense={editingTxn.isExpense}
          setEditingCat={setEditingCat}
        />
        <div className="wrap">
          <i className="bi bi-calendar-minus-fill"></i>
          <DatePicker
            value={editingTxn.date}
            additionalClass="date-picker-in-modal"
            onChange={(val: Date) => handlePropsChange("date", val)}
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
            {editingTxn._id ? "Save Changes" : "Add Transaction"}
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
