import express from "express";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ path: "/" });
});

export { router };
