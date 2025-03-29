<<<<<<< HEAD
import express from "express";
import {
  getAll,
}  from "../controller/PaymentFormController";
  const router = express.Router();

  router.get("/paymentForm", getAll);

=======
import express from "express";
import {
  getAll,
}  from "../controller/PaymentFormController";
  const router = express.Router();

  router.get("/paymentForm", getAll);

>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
  export default router;