import express from "express";
import { authMiddleware } from "../validators/authMiddleware";
import { adminMiddleware } from "../validators/adminMiddleware";

const router = express.Router();

router.get("/admin/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({ msg: "Bem-vindo ao painel do administrador!" });
});

export default router;
