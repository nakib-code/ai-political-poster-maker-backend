import { z } from "zod";

export const createPosterValidation = z.object({
  templateId: z.string().min(1),

  name: z
    .string()
    .min(2, "Name is required")
    .max(100),

  designation: z.string().max(100).optional(),

  organization: z.string().max(150).optional(),

  union: z.string().max(100).optional(),

  thana: z.string().max(100).optional(),

  district: z.string().max(100).optional(),

  occasion: z
    .string()
    .min(2, "Occasion is required")
    .max(100),

  headline: z
    .string()
    .min(2, "Headline is required")
    .max(200),

  photoUrls: z
    .array(z.string().url())
    .max(3, "Maximum 3 photos allowed")
    .optional(),
});