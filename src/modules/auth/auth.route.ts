import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authController } from "./auth.controller.js";

const router = Router();

router.post(
  "/register",
  authController.register
);

router.post(
  "/login",
  authController.login
);

router.get(
  "/me",
  authMiddleware,
  authController.me
);

export const authRoute = router;