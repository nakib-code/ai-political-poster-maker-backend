import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { uploadController } from "./upload.controller.js";

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
  uploadController.upload
);

export const uploadRoute = router;