import type { Request, Response } from "express";

import { aiService } from "./ai.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

const generateLayout = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      occasion,
      headline,
      templateTitle,
      colors,
      photoSlots,
    } = req.body;

    const result =
      await aiService.generatePosterLayout({
        occasion,
        headline,
        templateTitle,
        colors,
        photoSlots,
      });

    sendResponse(
      res,
      200,
      "AI layout generated successfully",
      result
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "AI layout generation failed";

    sendResponse(res, 500, message);
  }
};

export const aiController = {
  generateLayout,
};