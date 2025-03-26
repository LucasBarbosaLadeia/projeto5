import express from "express";
import {
  getAll,
  addCommentController,
} from "../controller/EvaluationsController";
import { authMiddleware } from "../validators/authMiddleware";
import validateEvaluation from "../schemas/EvaluatiosSchema";

const router = express.Router();

router.get("/evaluations", getAll);
router.post(
  "/films/:id/comments",
  authMiddleware,
  validateEvaluation,
  addCommentController
);

export default router;
