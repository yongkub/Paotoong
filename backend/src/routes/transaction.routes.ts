import { Router } from "express";
import {
  createTxn,
  getTxnsByMonth,
} from "../controllers/transaction.controller";
import requireAuth from "../middleware/requireAuth.middleware";
const router = Router();

router.use(requireAuth);
router.get("/", getTxnsByMonth);
router.post("/", createTxn);
export default router;
