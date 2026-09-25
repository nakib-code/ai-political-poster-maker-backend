import { Schema, model } from "mongoose";
import type { IPoster } from "./poster.interface.js";

const posterSchema = new Schema<IPoster>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    templateId: {
      type: Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      trim: true,
    },

    organization: {
      type: String,
      trim: true,
    },

    union: {
      type: String,
      trim: true,
    },

    thana: {
      type: String,
      trim: true,
    },

    district: {
      type: String,
      trim: true,
    },

    occasion: {
      type: String,
      required: true,
      trim: true,
    },

    headline: {
      type: String,
      required: true,
      trim: true,
    },

    photoUrls: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["GENERATING", "COMPLETED", "FAILED"],
      default: "GENERATING",
      index: true,
    },

    generatedImageUrl: {
      type: String,
    },

    generationCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Poster = model<IPoster>("Poster", posterSchema);