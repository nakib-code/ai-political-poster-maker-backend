import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createPosterValidation } from "./poster.validation.js";
import { posterController } from "./poster.controller.js";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createPosterValidation),
  posterController.create
);

router.get("/", posterController.getMine);

router.post(
  "/:id/regenerate",
  posterController.regenerate
);

router.delete(
  "/:id",
  posterController.remove
);

router.get(
  "/:id",
  posterController.getSingle
);

export const posterRoute = router;