import express from "express";
import { authMiddleware, admin } from "../validators/authMiddleware";

const router = express.Router();

router.get("/admin/dashboard", authMiddleware, admin, (req, res) => {
  res.status(200).json({ msg: "Bem-vindo ao painel do administrador!" });
});

export default router;
