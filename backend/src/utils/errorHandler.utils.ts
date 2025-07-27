import { Response } from "express";

const errorHandler = (err: unknown, res: Response) => {
  if (err instanceof Error) {
    console.log("😢 Internal Server Error:", err.message);
    res.status(500).json({ error: err.message });
  } else {
    console.log("🚨 Internal Server Error: Unknown");
    res.status(500).json({ error: "Unknow Error" });
  }
};

export default errorHandler;
