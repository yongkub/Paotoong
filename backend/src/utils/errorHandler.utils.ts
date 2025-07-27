import { Response } from "express";

const errorHandler = (err: unknown, res: Response) => {
  if (err instanceof Error) {
    console.log(
      "😢 Internal Server Error:",
      err.message,
      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    );
    res.status(500).json({ error: err.message });
  } else {
    console.log(
      "🚨 Internal Server Error: Unknown",
      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    );
    res.status(500).json({ error: "Unknow Error" });
  }
};

export default errorHandler;
