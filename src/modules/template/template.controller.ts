import type { Request, Response } from "express";
import {
  getTemplates,
  getTemplateById,
} from "./template.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const getAllTemplates = async (
  _req: Request,
  res: Response
) => {
  const templates = await getTemplates();

  sendResponse(
    res,
    200,
    "Templates retrieved successfully",
    templates
  );
};

export const getSingleTemplate = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;

  if (typeof id !== "string") {
    return sendResponse(res, 400, "Invalid template ID");
  }

  const template = await getTemplateById(id);

  if (!template) {
    return sendResponse(res, 404, "Template not found");
  }

  sendResponse(
    res,
    200,
    "Template retrieved successfully",
    template
  );
};