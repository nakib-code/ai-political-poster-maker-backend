import type { Request, Response } from "express";

import { uploadService } from "./upload.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

const upload = async (
  req: Request,
  res: Response
) => {
  const files = req.files as Express.Multer.File[];

  if (!files?.length) {
    return sendResponse(
      res,
      400,
      "At least one image is required"
    );
  }

  if (files.length > 3) {
    return sendResponse(
      res,
      400,
      "Maximum 3 images allowed"
    );
  }

  try {
    const urls = await Promise.all(
      files.map((file) =>
        uploadService.uploadImage(file.buffer)
      )
    );

    sendResponse(
      res,
      200,
      "Images uploaded successfully",
      { urls }
    );
  } catch {
    sendResponse(
      res,
      500,
      "Image upload failed"
    );
  }
};

export const uploadController = {
  upload,
};