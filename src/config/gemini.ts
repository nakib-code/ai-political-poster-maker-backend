import { GoogleGenAI } from "@google/genai";
import { env } from "./env.js";

if (!env.geminiApiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

export const gemini = new GoogleGenAI({
  apiKey: env.geminiApiKey,
});