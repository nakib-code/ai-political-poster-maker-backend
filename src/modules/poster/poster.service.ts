import { Poster } from "./poster.model.js";
import { Template } from "../template/template.model.js";
import { renderPoster } from "../renderer/renderer.service.js";
import cloudinary from "../../config/cloudinary.js";
import { aiService } from "../ai/ai.service.js";

interface CreatePosterPayload {
  templateId: string;
  name: string;
  designation?: string;
  organization?: string;
  union?: string;
  thana?: string;
  district?: string;
  occasion: string;
  headline: string;
  photoUrls?: string[];
}

const getPublicId = (url: string) => {
  try {
    const path = new URL(url).pathname;
    const index = path.indexOf("/upload/");

    if (index === -1) return null;

    return path
      .slice(index + 8)
      .replace(/^v\d+\//, "")
      .replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
};

const deleteImage = async (url: string) => {
  const publicId = getPublicId(url);

  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });
  } catch (error) {
    console.error("Cloudinary delete failed:", error);
  }
};

const uploadPoster = async (buffer: Buffer): Promise<string> =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ai-political-poster/generated",
        resource_type: "image",
        format: "png",
      },
      (error, result) => {
        if (error) return reject(error);

        if (!result?.secure_url) {
          return reject(
            new Error("Generated poster upload failed")
          );
        }

        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });

const createPoster = async (
  userId: string,
  payload: CreatePosterPayload
) => {
  const template = await Template.findOne({
    _id: payload.templateId,
    isActive: true,
  });

  if (!template) {
    throw new Error("Template not found");
  }

  const photoUrls = payload.photoUrls ?? [];

  if (
    photoUrls.length >
    template.layoutConfig.photoSlots
  ) {
    throw new Error(
      `This template supports maximum ${template.layoutConfig.photoSlots} photos`
    );
  }

  const poster = await Poster.create({
    ...payload,
    userId,
    photoUrls,
    status: "GENERATING",
    generationCount: 0,
  });

  let imageUrl: string | null = null;

  try {
    const layout = await aiService.generatePosterLayout({
      occasion: payload.occasion,
      headline: payload.headline,
      templateTitle: template.title,
      colors: template.layoutConfig.colors,
      photoSlots: template.layoutConfig.photoSlots,
    });

    const buffer = await renderPoster({
      name: payload.name,
      designation: payload.designation,
      organization: payload.organization,
      union: payload.union,
      thana: payload.thana,
      district: payload.district,
      occasion: payload.occasion,
      headline: payload.headline,
      photoUrls,
      layout,
    });

    imageUrl = await uploadPoster(buffer);

    poster.status = "COMPLETED";
    poster.generatedImageUrl = imageUrl;
    poster.generationCount = 1;

    await poster.save();

    return poster;
  } catch (error) {
    if (imageUrl) await deleteImage(imageUrl);

    poster.status = "FAILED";
    poster.generationCount += 1;

    await poster.save();

    throw error;
  }
};

const getMyPosters = async (userId: string) =>Poster.find({ userId }).sort({ createdAt: -1 });

const getPosterById = async (userId: string,posterId: string) =>
  Poster.findOne({
    _id: posterId,
    userId,
  });

const regeneratePoster = async (
  userId: string,
  posterId: string
) => {
  const poster = await Poster.findOne({
    _id: posterId,
    userId,
  });

  if (!poster) {
    throw new Error("Poster not found");
  }

  if (poster.generationCount >= 3) {
    throw new Error(
      "Maximum generation limit reached"
    );
  }

  const template = await Template.findOne({
    _id: poster.templateId,
    isActive: true,
  });

  if (!template) {
    throw new Error("Template not found");
  }

  const oldImage = poster.generatedImageUrl;

  poster.status = "GENERATING";
  await poster.save();

  let newImage: string | null = null;

  try {
    const layout = await aiService.generatePosterLayout({
      occasion: poster.occasion,
      headline: poster.headline,
      templateTitle: template.title,
      colors: template.layoutConfig.colors,
      photoSlots: template.layoutConfig.photoSlots,
    });

    const buffer = await renderPoster({
      name: poster.name,
      designation: poster.designation,
      organization: poster.organization,
      union: poster.union,
      thana: poster.thana,
      district: poster.district,
      occasion: poster.occasion,
      headline: poster.headline,
      photoUrls: poster.photoUrls,
      layout,
    });

    newImage = await uploadPoster(buffer);

    if (oldImage) {
      await deleteImage(oldImage);
    }

    poster.status = "COMPLETED";
    poster.generatedImageUrl = newImage;
    poster.generationCount += 1;

    await poster.save();

    return poster;
  } catch (error) {
    if (newImage) await deleteImage(newImage);

    poster.status = "FAILED";
    await poster.save();

    throw error;
  }
};

const deletePoster = async (
  userId: string,
  posterId: string
) => {
  const poster = await Poster.findOne({
    _id: posterId,
    userId,
  });

  if (!poster) {
    throw new Error("Poster not found");
  }

  if (poster.generatedImageUrl) {
    await deleteImage(poster.generatedImageUrl);
  }

  for (const photoUrl of poster.photoUrls) {
    await deleteImage(photoUrl);
  }

  await Poster.deleteOne({
    _id: posterId,
    userId,
  });

  return poster;
};

export const posterService = {
  createPoster,
  getMyPosters,
  getPosterById,
  regeneratePoster,
  deletePoster,
};