import { Schema, model, Types } from "mongoose";

export interface ITransaction {
  amount: number;
  note: string | undefined;
  label: string | undefined;
  date: Date;
  isExpense: boolean;
  categoryId: Types.ObjectId;
  userId: Types.ObjectId;
}

const transactionSchema = new Schema<ITransaction>(
  {
    amount: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
      maxlength: 10,
    },
    date: {
      type: Date,
      required: true,
    },
    isExpense: {
      type: Boolean,
      required: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ITransaction>("Transaction", transactionSchema);
