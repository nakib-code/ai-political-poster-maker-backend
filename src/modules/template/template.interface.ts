import type { Types } from "mongoose";

export type OccasionType =
  | "VICTORY_DAY"
  | "CONDOLENCE"
  | "CAMPAIGN"
  | "GREETING"
  | "FESTIVAL";

export interface ITemplate {
  title: string;
  occasionType: OccasionType;
  thumbnailUrl: string;
  backgroundUrl: string;

  layoutConfig: {
    width: number;
    height: number;
    photoSlots: number;
    textSlots: string[];
    colors: string[];
  };

  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITemplateDocument extends ITemplate {
  _id: Types.ObjectId;
}