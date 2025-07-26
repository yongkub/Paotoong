import { Router } from "express";
import { createTxn } from "../controllers/transaction.controller";
const router = Router();

router.post("/", createTxn);
export default router;
