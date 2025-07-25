import express from "express";
const router = express.Router();

router.get("/transactions", (req, res) => {
  res.json("haha");
});
export default router;
