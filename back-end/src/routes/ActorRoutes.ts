import express from "express";
import {
  getAll,
  getActorById,
  createActor,
  updateActor,
  addActorToFilm,
  destroyActorById,
} from "../controller/ActorController";
import { authMiddleware } from "../validators/authMiddleware";

const router = express.Router();

router.get("/actors", authMiddleware, getAll);
router.get("/actors/:id", authMiddleware, getActorById);
router.post("/actors", authMiddleware, createActor);
router.post("/actors/addActorToFilm", authMiddleware, addActorToFilm);
router.put("/actors/:id", authMiddleware, updateActor);
router.delete("/actors/:id", authMiddleware, destroyActorById);

export default router;
