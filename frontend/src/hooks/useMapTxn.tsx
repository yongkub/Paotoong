import type { TxnProps } from "./useFetchTxn";

export interface IMonthDayTxn {
  monthDay: string;
  txnsByDate: TxnProps[];
}

const useMapTxn = () => {
  const formatToMonthDay = (date: Date): string => {
    const dateStr = date.toDateString().split(" ");
    return dateStr[1] + " " + dateStr[2];
  };
  const mapTxnsByDate = (txns: TxnProps[]) => {
    let mapped: IMonthDayTxn[] = [];
    for (let txn of txns) {
      const monthDayList = mapped.map((item: IMonthDayTxn) => item.monthDay);
      const txnMonthDay = formatToMonthDay(txn.date);
      if (monthDayList.includes(txnMonthDay)) {
        const monthDayItems = mapped.find(
          (item: IMonthDayTxn) => item.monthDay === txnMonthDay
        )?.txnsByDate;
        monthDayItems?.push(txn);
      } else {
        const monthDayTxn: IMonthDayTxn = {
          monthDay: formatToMonthDay(txn.date),
          txnsByDate: [txn],
        };
        mapped.push(monthDayTxn);
      }
    }
    return mapped;
  };

  return { mapTxnsByDate };
};

export default useMapTxn;
