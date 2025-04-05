import express from "express";
import { admin, authMiddleware } from "../validators/authMiddleware";

const router = express.Router();

router.get("/dashboard", authMiddleware, admin, (req, res) => {
  if (!req.user.admin) {
    return res.status(403).json({ error: "Acesso negado: apenas admins" });
  }

  return res.status(200).json({ msg: "Você é um ADM!" });
});

export default router;
