import { Schema, model } from "mongoose";
import type { ITemplate } from "./template.interface.js";

const templateSchema = new Schema<ITemplate>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    occasionType: {
      type: String,
      enum: [
        "VICTORY_DAY",
        "CONDOLENCE",
        "CAMPAIGN",
        "GREETING",
        "FESTIVAL",
      ],
      required: true,
      index: true,
    },

    thumbnailUrl: {
      type: String,
      required: true,
    },

    backgroundUrl: {
      type: String,
      required: true,
    },

    layoutConfig: {
      width: {
        type: Number,
        required: true,
      },

      height: {
        type: Number,
        required: true,
      },

      photoSlots: {
        type: Number,
        default: 1,
      },

      textSlots: {
        type: [String],
        default: [],
      },

      colors: {
        type: [String],
        default: [],
      },
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Template = model<ITemplate>(
  "Template",
  templateSchema
);