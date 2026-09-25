import { z } from "zod";

export const createTemplateValidation = z.object({
  title: z.string().min(2),
  
  occasionType: z.enum([
    "VICTORY_DAY",
    "CONDOLENCE",
    "CAMPAIGN",
    "GREETING",
    "FESTIVAL",
  ]),

  thumbnailUrl: z.string().url(),

  backgroundUrl: z.string().url(),

  layoutConfig: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
    photoSlots: z.number().int().min(1).max(3),
    textSlots: z.array(z.string()),
    colors: z.array(z.string()),
  }),

  isActive: z.boolean().optional(),
});