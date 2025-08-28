import { useEffect, useState } from "react";
import TxnCard from "../components/TxnCard";
import "../css/Home.css";
import TxnModal from "../components/TxnModal";
import { Tooltip } from "antd";
import useFetchTxn, { type TxnProps } from "../hooks/useFetchTxn";
import MonthPicker from "../components/MonthPicker";
import ExpensesIcon from "../assets/icons/expenses.svg";
import IncomeIcon from "../assets/icons/income.svg";
import CashFlowIcon from "../assets/icons/cashflow.svg";
import useMapTxn, { type IMonthDayTxn } from "../hooks/useMapTxn";
import useRefetchContext from "../hooks/useRefetchContext";

const Home = () => {
  const [showTxnModal, setShowTxnModal] = useState(false);
  const [txns, setTxns] = useState<TxnProps[]>([]);
  const [expenses, setExpenses] = useState(0);
  const [income, setIncome] = useState(0);
  const [filtDate, setFiltDate] = useState(new Date());
  const { fetchTxns } = useFetchTxn();
  const { mapTxnsByDate } = useMapTxn();
  const { refetchFlag } = useRefetchContext();

  const fetchAndUpdateTxns = async () => {
    const fetchedTxns = await fetchTxns(
      filtDate.getMonth() + 1,
      filtDate.getFullYear()
    );
    if (!fetchedTxns) {
      setTxns([]);
      return;
    }
    setTxns(fetchedTxns as TxnProps[]);
    const totExpenses = fetchedTxns
      ?.filter((txn: TxnProps) => txn.isExpense)
      .map((txn: TxnProps) => txn.amount)
      .reduce((total: number, expense: number) => total + expense, 0);

    const totIncome = fetchedTxns
      ?.filter((txn: TxnProps) => !txn.isExpense)
      .map((txn: TxnProps) => txn.amount)
      .reduce((total: number, income: number) => total + income, 0);

    setExpenses(totExpenses ?? 0);
    setIncome(totIncome ?? 0);
  };

  useEffect(() => {
    fetchAndUpdateTxns();
  }, [filtDate, refetchFlag]);

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

  const handleAddNewTxn = () => {
    setGlobalTxn(iniTxn);
    setShowTxnModal(true);
  };

  const handleSelectMonth = (newMonthYear: any) => {
    const newDate = new Date(newMonthYear.year, newMonthYear.month);
    setFiltDate(newDate);
  };

  const mappedTxns = mapTxnsByDate(txns);

  return (
    <div className="container-fluid">
      <Tooltip placement="left" title={<span>Add New Transaction</span>}>
        <div
          className="position-fixed bottom-0 text-black rounded-circle bg-white translate-middle end-0"
          id="add-txn"
          onClick={handleAddNewTxn}
        >
          <i className="bi bi-plus"></i>
        </div>
      </Tooltip>
      <div className="row justify-content-center gap-3">
        <div className="w-100 d-flex gap-2 align-items-center">
          <i className="bi bi-filter"></i>
          <MonthPicker onChange={(value) => handleSelectMonth(value)} />
          <div className="row flex-grow-1 px-3">
            <div className="text-danger col-12 col-md-4 col-lg-3 d-flex align-items-center">
              <img src={ExpensesIcon} style={{ width: "16px" }} />
              <span className="ms-1">Expenses: </span>
              <span className="ms-2">-{expenses.toLocaleString()} THB</span>
            </div>
            <div className="text-success col-12 col-md-4 col-lg-3 d-flex align-items-center">
              <img src={IncomeIcon} style={{ width: "16px" }} />
              <span className="ms-1">Income: </span>
              <span className="ms-2">+{income.toLocaleString()} THB</span>
            </div>
            <div className="col-12 col-md-4 col-lg-3 d-flex align-items-center">
              <img src={CashFlowIcon} style={{ width: "16px" }} />
              <span className="ms-1">Cash Flow: </span>
              <span
                className={
                  "ms-2 " +
                  (income > expenses
                    ? "text-success"
                    : income < expenses
                    ? "text-danger"
                    : "")
                }
              >
                {(income - expenses).toLocaleString()} THB
              </span>
            </div>
          </div>
        </div>
        {txns.length > 0 &&
          mappedTxns.map((mapped: IMonthDayTxn, mdInd) => {
            return (
              <div key={mdInd} className="my-3">
                <div className="px-2 py-1 bg-field">{mapped.monthDay}</div>
                <div>
                  {mapped.txnsByDate.map((txn: TxnProps, txnInd) => {
                    return (
                      <TxnCard
                        key={txnInd}
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
                </div>
              </div>
            );
          })}
        {txns.length == 0 && (
          <div className="text-center">No transactions yet</div>
        )}
      </div>
      {showTxnModal && (
        <TxnModal globalTxn={globalTxn} hideModal={hideTxnModal} />
      )}
    </div>
  );
};
export default Home;
