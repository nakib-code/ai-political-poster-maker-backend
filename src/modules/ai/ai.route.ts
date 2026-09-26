import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { aiController } from "./ai.controller.js";

const router = Router();

router.post(
  "/layout",
  authMiddleware,
  aiController.generateLayout
);

export const aiRoute = router;