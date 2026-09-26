import { Router } from "express";
import { posterRoute } from "../modules/poster/poster.route.js";
import { uploadRoute } from "../modules/upload/upload.route.js";
import { aiRoute } from "../modules/ai/ai.route.js";
import { templateRoute } from "../modules/template/template.route.js";
import { authRoute } from "../modules/auth/auth.route.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/templates", templateRoute);
router.use("/posters", posterRoute);
router.use("/upload", uploadRoute);
router.use("/ai", aiRoute);

export default router;