import express from "express";

import {
  getAll,
  createFilme,
  getFilmeById,
  updateFilme,
} from "../controller/FilmeController";

const router = express.Router();

router.get("/filmes", getAll);
router.get("/filmes:id", getFilmeById);
router.post("/filmes", createFilme);
router.put("/filmes:id", updateFilme);
router.delete("/filmes:id", updateFilme);

export default router;
