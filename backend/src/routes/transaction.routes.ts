import { Router } from "express";
import {
  createTxn,
  deleteTxn,
  getTxnsByMonth,
  updateTxn,
} from "../controllers/transaction.controller";
import requireAuth from "../middleware/requireAuth.middleware";
const router = Router();

router.use(requireAuth);
router.get("/", getTxnsByMonth);
router.post("/", createTxn);
router.put("/:id", updateTxn);
router.delete("/:id", deleteTxn);
export default router;
