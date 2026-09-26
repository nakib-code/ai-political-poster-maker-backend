import { Router } from "express";

import { templateController } from "./template.controller.js";

const router = Router();

router.get("/", templateController.getAllTemplates);
router.get("/:id", templateController.getSingleTemplate);

export const templateRoute = router;