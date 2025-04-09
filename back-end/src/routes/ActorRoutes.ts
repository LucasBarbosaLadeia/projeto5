import express from "express";
import {
  getAll,
  getActorById,
  createActor,
  updateActor,
  addActorToFilm,
} from "../controller/ActorController";

const router = express.Router();

router.get("/actors", getAll);
router.get("/actors/:id", getActorById);
router.post("/actors", createActor);
router.post("/actors/addActorToFilm", addActorToFilm);
router.put("/actors/:id", updateActor);
router.delete("/actors/:id", updateActor);

export default router;
