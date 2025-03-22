import express from "express";
import { getAll, getActorFilmById } from "../controller/ActorFilmController";

const router = express.Router();

router.get("/actorfilms", getAll);
router.get("/actorfilms/:id", getActorFilmById);

export default router;
