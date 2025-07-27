import { Request, Router } from "express";
import requireAuth from "../middleware/requireAuth.middleware";
import {
  createCategory,
  getAllCategories,
} from "../controllers/category.controller";
const router = Router();

router.use(requireAuth);

router.post("/", createCategory);

router.get("/", getAllCategories);

export default router;
