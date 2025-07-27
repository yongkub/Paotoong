import { Request, Router } from "express";
import requireAuth from "../middleware/requireAuth.middleware";
import { createCategory } from "../controllers/category.controller";
const router = Router();

router.use(requireAuth);

router.post("/", createCategory);

export default router;
