import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler.utils";
import Transaction, { ITransaction } from "../models/transaction.model";
import { AuthRequest } from "../middleware/requireAuth.middleware";
import { Types } from "mongoose";
import Category from "../models/category.model";

interface ITxnReqBody {
  _id?: Types.ObjectId;
  amount: number;
  note?: string;
  label?: string;
  date: Date;
  isExpense: boolean;
  category: string;
}
//get txns by month
export const getTxnsByMonth = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.userId;

    const month = parseInt(req.query.month as string);
    const year = parseInt(req.query.year as string);
    const txns = await Transaction.aggregate([
      {
        $match: {
          userId,
          $expr: {
            $and: [
              { $eq: [{ $month: "$date" }, month] },
              { $eq: [{ $year: "$date" }, year] },
            ],
          },
        },
      },
      {
        $sort: { date: -1 },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          amount: 1,
          date: 1,
          label: 1,
          note: 1,
          isExpense: 1,
          category: "$category.name",
        },
      },
    ]);
    res.status(200).json(txns);
  } catch (err: unknown) {
    errorHandler(err, res);
  }
};

//create new txn
export const createTxn = async (req: Request, res: Response) => {
  const txnReqBody: ITxnReqBody = req.body;
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.userId as Types.ObjectId;
    const categoryName = txnReqBody.category;
    const categoryDoc = await Category.findOne({ name: categoryName }).select(
      "_id"
    );
    if (!categoryDoc) {
      throw Error(`The category name: ${categoryName} does not exist`);
    }
    const txn: ITransaction = {
      ...txnReqBody,
      userId,
      categoryId: categoryDoc._id,
    };
    const newTxn = await Transaction.create(txn);
    res.status(200).json(newTxn);
  } catch (err: unknown) {
    errorHandler(err, res);
  }
};

//update txn
export const updateTxn = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const updatedTxnBody: ITxnReqBody = req.body;
    const { category: categoryName, ...incompletedTxn } = updatedTxnBody;
    const categoryDoc = await Category.findOne({ name: categoryName }).select(
      "_id"
    );
    if (!categoryDoc) {
      throw Error(`Can't find the category: ${categoryName}`);
    }
    const updatedTxn = { ...incompletedTxn, categoryId: categoryDoc._id }; //lack of userId, but it should be constant since only the user can edit their own txn
    const updated = await Transaction.findByIdAndUpdate(_id, updatedTxn, {
      new: true,
      overwrite: true,
      runValidators: true,
    });
    res.status(200).json(updated);
    console.log("Updated successfully", updated);
  } catch (err: unknown) {
    errorHandler(err, res);
  }
};

//delete
export const deleteTxn = async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const deleted = await Transaction.findByIdAndDelete(_id);
    res.status(200).json(true);
    console.log("Deleted successfully", deleted);
  } catch (err: unknown) {
    errorHandler(err, res);
  }
};
