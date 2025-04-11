import express from "express";
import {
  getAll,
  getActorById,
  createActor,
  updateActor,
  addActorToFilm,
  destroyActorById,
} from "../controller/ActorController";
import { adminMiddleware } from "../validators/adminMiddleware";
import { authMiddleware } from "../validators/authMiddleware";

const router = express.Router();

router.get("/actors", authMiddleware, getAll);
router.get("/actors/:id", authMiddleware, getActorById);
router.post("/actors", authMiddleware, adminMiddleware, createActor);
router.post(
  "/actors/addActorToFilm",
  authMiddleware,
  adminMiddleware,
  addActorToFilm
);
router.put("/actors/:id", authMiddleware, adminMiddleware, updateActor);
router.delete("/actors/:id", authMiddleware, adminMiddleware, destroyActorById);

export default router;
