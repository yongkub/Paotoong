import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes";
import transactionRoutes from "./routes/transaction.routes";
const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());
//routes
app.use("/api/user", userRoutes);
app.use("/api/transaction", transactionRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI ?? "")
  .then(() => {
    app.listen(port, () => {
      console.log("connected to db & listening on port", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
