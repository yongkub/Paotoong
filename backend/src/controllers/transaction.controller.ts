import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler.utils";
import Transaction, { ITransaction } from "../models/transaction.model";
import { AuthRequest } from "../middleware/requireAuth.middleware";

//get txns by month
export const getTxnsByMonth = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const month = parseInt(req.query.month as string);
    const year = parseInt(req.query.year as string);
    const txns = Transaction.find({
      userId,
      $expr: {
        $and: [
          { $eq: [{ $month: "$date" }, month] },
          { $eq: [{ $year: "$date" }, year] },
        ],
      },
    }).sort({ date: -1 });
    res.status(200).json(txns);
  } catch (err: unknown) {
    errorHandler(err, res);
  }
};

//create new txn
export const createTxn = async (req: Request, res: Response) => {
  const txn: ITransaction = req.body;
  try {
    const newTxn = await Transaction.create(txn);
    res.status(200).json(newTxn);
  } catch (err: unknown) {
    errorHandler(err, res);
  }
};

//update txn
export const updateTxn = async (req: Request, res: Response) => {
  const txn: ITransaction = req.body();
  try {
  } catch (err: unknown) {
    errorHandler(err, res);
  }
};
