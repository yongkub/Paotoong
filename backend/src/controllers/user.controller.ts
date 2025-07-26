import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHandler.utils";

const createToken = (_id: Types.ObjectId) => {
  return jwt.sign({ _id }, process.env.SECRET as string, {
    expiresIn: "3d",
  });
};

//sign up
export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.signup(username, password);
    const token = createToken(user._id);
    res.status(200).json({ username, token });
  } catch (err: unknown) {
    errorHandler(err, res);
  }
};

//login
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.status(200).json({ username, token });
  } catch (err: unknown) {
    errorHandler(err, res);
  }
};
