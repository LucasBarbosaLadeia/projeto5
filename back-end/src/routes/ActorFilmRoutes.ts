import express from "express";
import {
  getAll,
  getById,

} from "../controller/ActorFilmController";

const router = express.Router();

router.get("/actors-films", getAll);
router.get("/actors-films/:id_film/:id_actor", getById);


export default router;
