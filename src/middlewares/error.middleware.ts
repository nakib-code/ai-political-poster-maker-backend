import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

import mongoose from "mongoose";
import { ZodError } from "zod";
import multer from "multer";

import { AppError } from "../utils/AppError.js";

const errorHandler: ErrorRequestHandler = (
  error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal server error";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof ZodError) {
    statusCode = 400;
    message = error.issues
      .map((issue) => issue.message)
      .join(", ");
  } else if (error instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid ID";
  } else if (
    error instanceof mongoose.Error.ValidationError
  ) {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((err) => err.message)
      .join(", ");
  } else if (
    error instanceof multer.MulterError
  ) {
    statusCode = 400;

    if (error.code === "LIMIT_FILE_SIZE") {
      message = "File size cannot exceed 5MB";
    } else if (error.code === "LIMIT_FILE_COUNT") {
      message = "Maximum 3 images allowed";
    } else {
      message = error.message;
    }
  } else if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === 11000
  ) {
    statusCode = 409;
    message = "Duplicate value already exists";
  } else if (error instanceof Error) {
    message = error.message;
  }

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;