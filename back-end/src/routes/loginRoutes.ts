import express from "express";
import { loginUser } from "../controller/loginController";

const router = express.Router();

router.post("/login", loginUser);

<<<<<<< HEAD

=======
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
export default router;
