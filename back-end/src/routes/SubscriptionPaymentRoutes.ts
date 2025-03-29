<<<<<<< HEAD
import express from "express";
import {
  getAll,
}  from "../controller/SubscriptionPaymentController";
  const router = express.Router();

  router.get("/subscritionPayment", getAll);

=======
import express from "express";
import {
  getAll,
}  from "../controller/SubscriptionPaymentController";
  const router = express.Router();

  router.get("/subscritionPayment", getAll);

>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
  export default router;