import express from "express";
import { getAll } from "../controller/PaymentFormController";
const router = express.Router();

router.get("/paymentForm", getAll);

export default router;
