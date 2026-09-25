import { Router } from "express";
import { generateLayout } from "./ai.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/layout",
  authMiddleware,
  generateLayout
);

export const aiRoute = router;