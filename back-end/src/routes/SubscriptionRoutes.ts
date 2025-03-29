<<<<<<< HEAD
import express from "express";
import {
  getAll,
}  from "../controller/SubscriptionController";
  const router = express.Router();

  router.get("/subscriptions", getAll);

=======
import express from "express";
import {
  getAll,
}  from "../controller/SubscriptionController";
  const router = express.Router();

  router.get("/subscriptions", getAll);

>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
  export default router;