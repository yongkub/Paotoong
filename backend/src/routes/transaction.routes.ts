import { Router } from "express";
import { createTxn } from "../controllers/transaction.controller";
import requireAuth from "../middleware/requireAuth.middleware";
const router = Router();

router.use(requireAuth);
router.post("/", createTxn);
export default router;
