import express from "express";
<<<<<<< HEAD
import { getAll } from "../controller/EvaluationsController";
=======
import {
  getAll,
  addCommentController,
} from "../controller/EvaluationsController";
import { authMiddleware } from "../validators/authMiddleware";
import { validateEvaluation } from "../schemas/EvaluatiosSchema";
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7

const router = express.Router();

router.get("/evaluations", getAll);

<<<<<<< HEAD
=======
router.post(
  "/films/:id/comments",
  authMiddleware,
  validateEvaluation,
  addCommentController
);

>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
export default router;
