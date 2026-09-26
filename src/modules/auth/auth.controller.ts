import type { Request, Response } from "express";

import { authService } from "./auth.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

const register = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await authService.registerUser(
      req.body
    );

    sendResponse(
      res,
      201,
      "User registered successfully",
      result
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Registration failed";

    sendResponse(res, 400, message);
  }
};

const login = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await authService.loginUser(
      req.body
    );

    sendResponse(
      res,
      200,
      "Login successful",
      result
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Login failed";

    sendResponse(res, 401, message);
  }
};

const me = async (
  req: Request,
  res: Response
) => {
  if (!req.user) {
    return sendResponse(res, 401, "Unauthorized");
  }

  try {
    const user = await authService.getMe(
      req.user.userId
    );

    sendResponse(
      res,
      200,
      "User retrieved successfully",
      user
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to retrieve user";

    sendResponse(res, 404, message);
  }
};

export const authController = {
  register,
  login,
  me,
};