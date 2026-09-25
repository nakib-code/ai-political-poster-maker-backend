import { Poster } from "./poster.model.js";
import { Template } from "../template/template.model.js";
import { generatePosterLayout } from "../ai/ai.service.js";
import { renderPoster } from "../renderer/renderer.service.js";
import cloudinary from "../../config/cloudinary.js";

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

const uploadPoster = async (
  buffer: Buffer
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ai-political-poster/generated",
        resource_type: "image",
        format: "png",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

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
};

export const createPoster = async (
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

  try {
    const layout = await generatePosterLayout({
      occasion: payload.occasion,
      headline: payload.headline,
      templateTitle: template.title,
      colors: template.layoutConfig.colors,
      photoSlots: template.layoutConfig.photoSlots,
    });

    const imageBuffer = await renderPoster({
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

    const generatedImageUrl =
      await uploadPoster(imageBuffer);

    poster.status = "COMPLETED";
    poster.generatedImageUrl = generatedImageUrl;
    poster.generationCount = 1;

    await poster.save();

    return poster;
  } catch (error) {
    poster.status = "FAILED";
    poster.generationCount += 1;

    await poster.save();

    throw error;
  }
};

export const getMyPosters = async (
  userId: string
) => {
  return Poster.find({ userId }).sort({
    createdAt: -1,
  });
};

export const getPosterById = async (
  userId: string,
  posterId: string
) => {
  return Poster.findOne({
    _id: posterId,
    userId,
  });
};

export const regeneratePoster = async (
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

  poster.status = "GENERATING";
  await poster.save();

  try {
    const layout = await generatePosterLayout({
      occasion: poster.occasion,
      headline: poster.headline,
      templateTitle: template.title,
      colors: template.layoutConfig.colors,
      photoSlots: template.layoutConfig.photoSlots,
    });

    const imageBuffer = await renderPoster({
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

    const generatedImageUrl =
      await uploadPoster(imageBuffer);

    poster.status = "COMPLETED";
    poster.generatedImageUrl = generatedImageUrl;
    poster.generationCount += 1;

    await poster.save();

    return poster;
  } catch (error) {
    poster.status = "FAILED";
    await poster.save();

    throw error;
  }
};