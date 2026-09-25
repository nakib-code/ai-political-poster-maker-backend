import type { PosterLayoutSuggestion } from "../ai/ai.interface.js";

export interface RenderPosterInput {
  name: string;
  designation?: string;
  organization?: string;

  union?: string;
  thana?: string;
  district?: string;

  occasion: string;
  headline: string;

  photoUrls: string[];

  layout: PosterLayoutSuggestion;
}