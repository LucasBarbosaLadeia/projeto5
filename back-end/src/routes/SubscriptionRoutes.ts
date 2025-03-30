import express from "express";
import { getAll } from "../controller/SubscriptionController";
const router = express.Router();

router.get("/subscriptions", getAll);

export default router;
