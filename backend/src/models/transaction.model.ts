import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;
const transactionSchema = new Schema(
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

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
