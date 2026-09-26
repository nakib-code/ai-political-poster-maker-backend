import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import { posterService } from "./poster.service.js";

const create = async (
  req: Request,
  res: Response
) => {
  if (!req.user) {
    return sendResponse(
      res,
      401,
      "Unauthorized"
    );
  }

  try {
    const poster = await posterService.createPoster(
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

    sendResponse(
      res,
      400,
      message
    );
  }
};
const getMine = async (
  req: Request,
  res: Response
) => {
  if (!req.user) {
    return sendResponse(
      res,
      401,
      "Unauthorized"
    );
  }

  try {
    const posters = await posterService.getMyPosters(
      req.user.userId
    );

    sendResponse(
      res,
      200,
      "Posters retrieved successfully",
      posters
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to retrieve posters";

    sendResponse(
      res,
      500,
      message
    );
  }
};

const getSingle = async (
  req: Request,
  res: Response
) => {
  if (!req.user) {
    return sendResponse(
      res,
      401,
      "Unauthorized"
    );
  }

  const id = req.params.id;

  if (typeof id !== "string") {
    return sendResponse(
      res,
      400,
      "Invalid poster ID"
    );
  }

  try {
    const poster = await posterService.getPosterById(
      req.user.userId,
      id
    );

    if (!poster) {
      return sendResponse(
        res,
        404,
        "Poster not found"
      );
    }

    sendResponse(
      res,
      200,
      "Poster retrieved successfully",
      poster
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to retrieve poster";

    sendResponse(
      res,
      500,
      message
    );
  }
};

const regenerate = async (
  req: Request,
  res: Response
) => {
  if (!req.user) {
    return sendResponse(
      res,
      401,
      "Unauthorized"
    );
  }

  const posterId = req.params.id;

  if (typeof posterId !== "string") {
    return sendResponse(
      res,
      400,
      "Invalid poster ID"
    );
  }

  try {
    const poster = await posterService.regeneratePoster(
      req.user.userId,
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

    sendResponse(
      res,
      400,
      message
    );
  }
};

const remove = async (
  req: Request,
  res: Response
) => {
  if (!req.user) {
    return sendResponse(
      res,
      401,
      "Unauthorized"
    );
  }

  const posterId = req.params.id;

  if (typeof posterId !== "string") {
    return sendResponse(
      res,
      400,
      "Invalid poster ID"
    );
  }

  try {
    await posterService.deletePoster(
      req.user.userId,
      posterId
    );

    sendResponse(
      res,
      200,
      "Poster deleted successfully"
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to delete poster";

    sendResponse(
      res,
      400,
      message
    );
  }
};


export const  posterController = {
  create,
  getMine,
  getSingle,
  regenerate,
  remove
}