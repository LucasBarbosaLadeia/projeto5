import express from "express";
import {
  getAll,
}  from "../controller/SubscriptionController";
  const router = express.Router();

  router.get("/subscritionPayment", getAll);

  export default router;