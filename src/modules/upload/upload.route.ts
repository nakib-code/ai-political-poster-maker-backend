import { Router } from "express";
import multer from "multer";
import { upload } from "./upload.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/images",
  authMiddleware,
  uploadMiddleware.array("images", 3),
  upload
);

export const uploadRoute = router;