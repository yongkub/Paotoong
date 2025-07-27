import { useState } from "react";
import type { TxnProps } from "../pages/Home";
import { DatePicker } from "antd";

const TxnModal = ({
  globalTxn,
  hideModal,
}: {
  globalTxn: TxnProps;
  hideModal: () => void;
}) => {
  const [editingTxn, setEditingTxn] = useState(globalTxn);

  const handlePropsChange = (field: keyof TxnProps, newValue: any) => {
    setEditingTxn((prev) => ({ ...prev, [field]: newValue }));
  };

  const handleSaveChanges = () => {
    hideModal();
  };

  return (
    <div className="px-3 py-2 bg-danger position-fixed translate-middle w-50 start-50 top-50">
      <DatePicker />
      <div>
        <i className="bi bi-pencil-fill"></i>
        <input
          type="text"
          value={editingTxn.note}
          placeholder="Write a note"
          onChange={(e) => handlePropsChange("note", e.target.value)}
        />
      </div>
      <button onClick={handleSaveChanges} className="btn btn-success">
        Save Changes
      </button>
    </div>
  );
};
export default TxnModal;
