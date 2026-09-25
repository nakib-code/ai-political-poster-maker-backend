import { Type } from "@google/genai";
import { gemini } from "../../config/gemini.js";
import type { PosterLayoutSuggestion } from "./ai.interface.js";

export const generatePosterLayout = async (input: {
  occasion: string;
  headline: string;
  templateTitle: string;
  colors: string[];
  photoSlots: number;
}): Promise<PosterLayoutSuggestion> => {
  const prompt = `
You are a professional poster layout designer.

Create a visual layout suggestion for a Bangla political poster.

Occasion: ${input.occasion}
Headline: ${input.headline}
Template: ${input.templateTitle}
Available colors: ${input.colors.join(", ")}
Photo slots: ${input.photoSlots}

Rules:
- Do not rewrite the headline.
- Do not create political slogans.
- Do not create names of politicians or political parties.
- Only suggest visual layout and styling.
- Keep the design clean and print-ready.
`;

  const response = await gemini.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          backgroundStyle: {
            type: Type.STRING,
          },
          primaryColor: {
            type: Type.STRING,
          },
          secondaryColor: {
            type: Type.STRING,
          },
          textAlignment: {
            type: Type.STRING,
            enum: ["left", "center", "right"],
          },
          photoArrangement: {
            type: Type.STRING,
            enum: ["single", "horizontal", "grid"],
          },
          decoration: {
            type: Type.STRING,
          },
          fontStyle: {
            type: Type.STRING,
            enum: ["bold", "elegant", "modern"],
          },
        },
        required: [
          "backgroundStyle",
          "primaryColor",
          "secondaryColor",
          "textAlignment",
          "photoArrangement",
          "decoration",
          "fontStyle",
        ],
      },
    },
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response");
  }

  return JSON.parse(response.text) as PosterLayoutSuggestion;
};