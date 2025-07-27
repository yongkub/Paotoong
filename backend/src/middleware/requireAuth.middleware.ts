import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import { Types } from "mongoose";

interface TokenPayload extends JwtPayload {
  _id: string;
}
export interface AuthRequest extends Request {
  user: Types.ObjectId | null;
}

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization; // Bearer: eJdsXdq..
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization?.split(" ")[1];
  try {
    const { _id } = jwt.verify(
      token,
      process.env.SECRET as string
    ) as TokenPayload;
    const authReq = req as AuthRequest; // authReq and req are the same object
    authReq.user = await User.findById(_id).select("_id");
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
