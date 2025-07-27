import { Request, Response } from "express";
import Category, { ICategory } from "../models/category.model";
import errorHandler from "../utils/errorHandler.utils";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category: ICategory = req.body;
    const newCategory = await Category.create(category);
    res.status(200).json(newCategory);
  } catch (err) {
    errorHandler(err, res);
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    errorHandler(err, res);
  }
};
