import express from "express";
import {
  getAll,
  getEvaluationById,
  addCommentController,
  updateCommentController,
  deleteCommentController,
} from "../controller/CommentController";
import { authMiddleware } from "../validators/authMiddleware";
import { validateEvaluation } from "../schemas/EvaluatiosSchema";

const router = express.Router();

router.get("/evaluations", authMiddleware, getAll);
router.post(
  "/films/:id/comments",

  authMiddleware,
  validateEvaluation,
  addCommentController);
  router.get("/evaluations", getEvaluationById);

router.put("/evaluations/:id", authMiddleware, updateCommentController);
router.delete("/evaluations/:id", authMiddleware, deleteCommentController);

export default router;
