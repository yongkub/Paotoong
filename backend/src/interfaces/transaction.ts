import mongoose from "mongoose";

export interface ITransaction extends mongoose.Document {
  amount: number;
  note: string | undefined;
  label: string | undefined;
  date: Date;
  categoryId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}
