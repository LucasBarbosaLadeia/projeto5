<<<<<<< HEAD
import express from "express";
import {
  getAll,
  getUserById,
  createUser,
  updateUser,
} from "../controller/UserController";

const router = express.Router();

router.get("/users", getAll);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", updateUser);

export default router;
=======
import express from "express";
import {
  getAll,
  getUserById,
  createUser,
  updateUser,
} from "../controller/UserController";

const router = express.Router();

router.get("/users", getAll);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", updateUser);

export default router;
>>>>>>> 31eb1faf6aeb4217d2c6a415ba5b664c7c5134bc
