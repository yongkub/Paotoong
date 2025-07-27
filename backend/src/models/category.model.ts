import { Schema, model } from "mongoose";

export interface ICategory {
  name: string;
  isExpense: boolean;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  isExpense: {
    type: Boolean,
    required: true,
  },
});

export default model<ICategory>("Category", categorySchema);
