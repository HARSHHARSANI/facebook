import express from "express";
import {
  activateAccount,
  login,
  register,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);

export default router;
