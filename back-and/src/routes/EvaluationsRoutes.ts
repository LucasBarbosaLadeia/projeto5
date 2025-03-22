import express from "express";
import { getAll } from "../controller/EvaluationsController";

const router = express.Router();

router.get("/evaluations", getAll);

export default router;
