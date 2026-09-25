import type { Types } from "mongoose";

export type PosterStatus =
  | "GENERATING"
  | "COMPLETED"
  | "FAILED";

export interface IPoster {
  userId: Types.ObjectId;
  templateId: Types.ObjectId;

  name: string;
  designation?: string;
  organization?: string;

  union?: string;
  thana?: string;
  district?: string;

  occasion: string;
  headline: string;

  photoUrls: string[];

  status: PosterStatus;
  generatedImageUrl?: string;

  generationCount: number;

  createdAt?: Date;
  updatedAt?: Date;
}