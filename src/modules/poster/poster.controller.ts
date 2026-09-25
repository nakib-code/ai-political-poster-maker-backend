import type { Request, Response } from "express";
import {
  createPoster,
  getMyPosters,
  getPosterById,
  regeneratePoster,
} from "./poster.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const create = async (
  req: Request,
  res: Response
) => {
  if (!req.user) {
    return sendResponse(res, 401, "Unauthorized");
  }

  try {
    const poster = await createPoster(
      req.user.userId,
      req.body
    );

    sendResponse(
      res,
      201,
      "Poster generation started",
      poster
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create poster";

    sendResponse(res, 400, message);
  }
};

export const getMine = async (
  req: Request,
  res: Response
) => {
  if (!req.user) {
    return sendResponse(res, 401, "Unauthorized");
  }

  const posters = await getMyPosters(req.user.userId);

  sendResponse(
    res,
    200,
    "Posters retrieved successfully",
    posters
  );
};

export const getSingle = async (
  req: Request,
  res: Response
) => {
  if (!req.user) {
    return sendResponse(res, 401, "Unauthorized");
  }

  const id = req.params.id;

  if (typeof id !== "string") {
    return sendResponse(res, 400, "Invalid poster ID");
  }

  const poster = await getPosterById(
    req.user.userId,
    id
  );

  if (!poster) {
    return sendResponse(res, 404, "Poster not found");
  }

  sendResponse(
    res,
    200,
    "Poster retrieved successfully",
    poster
  );
};

export const regenerate = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.userId;
    const posterId = String(req.params.id);

    const poster = await regeneratePoster(
      userId,
      posterId
    );

    sendResponse(
      res,
      200,
      "Poster regenerated successfully",
      poster
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Poster regeneration failed";

    sendResponse(res, 500, message);
  }
};