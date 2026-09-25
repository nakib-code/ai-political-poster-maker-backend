import { Router } from "express";
import {
  create,
  getMine,
  getSingle,
  regenerate,
} from "./poster.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createPosterValidation } from "./poster.validation.js";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createPosterValidation),
  create
);

router.post(
  "/:id/regenerate",
  regenerate
);

router.get("/", getMine);
router.get("/:id", getSingle);


export const posterRoute = router;