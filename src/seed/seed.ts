import mongoose from "mongoose";
import { env } from "../config/env.js";
import { Template } from "../modules/template/template.model.js";

const templates = [
  {
    title: "Victory Day",
    occasionType: "VICTORY_DAY",
    thumbnailUrl: "https://placehold.co/300x400",
    backgroundUrl: "https://placehold.co/1080x1350",
    layoutConfig: {
      width: 1080,
      height: 1350,
      photoSlots: 2,
      textSlots: ["headline", "name", "designation"],
      colors: ["#006a4e", "#f42a41"],
    },
    isActive: true,
  },
  {
    title: "Condolence",
    occasionType: "CONDOLENCE",
    thumbnailUrl: "https://placehold.co/300x400",
    backgroundUrl: "https://placehold.co/1080x1350",
    layoutConfig: {
      width: 1080,
      height: 1350,
      photoSlots: 1,
      textSlots: ["headline", "name", "designation"],
      colors: ["#111111", "#ffffff"],
    },
    isActive: true,
  },
  {
    title: "Campaign",
    occasionType: "CAMPAIGN",
    thumbnailUrl: "https://placehold.co/300x400",
    backgroundUrl: "https://placehold.co/1080x1350",
    layoutConfig: {
      width: 1080,
      height: 1350,
      photoSlots: 3,
      textSlots: ["headline", "name", "designation", "location"],
      colors: ["#1e3a8a", "#ffffff"],
    },
    isActive: true,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(env.mongodbUri);

    await Template.deleteMany({});
    await Template.insertMany(templates);

    console.log("Templates seeded successfully");
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seed();