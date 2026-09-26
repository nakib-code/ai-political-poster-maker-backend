import mongoose from "mongoose";
import { Template } from "../modules/template/template.model.js";
import { connectDB } from "../config/db.js";



const templates = [
  {
    title: "Victory Day",
    occasionType: "VICTORY_DAY",

    // Temporary placeholder images.
    // Later these can be replaced with real template thumbnails/backgrounds.
    thumbnailUrl:
      "https://placehold.co/600x750/006a4e/ffffff?text=Victory+Day",

    backgroundUrl:
      "https://placehold.co/1080x1350/006a4e/ffffff?text=Victory+Day",

    layoutConfig: {
      width: 1080,
      height: 1350,
      photoSlots: 2,

      textSlots: [
        "occasion",
        "headline",
        "name",
        "designation",
        "organization",
        "location",
      ],

      colors: [
        "#006a4e",
        "#f42a41",
        "#ffffff",
      ],
    },

    isActive: true,
  },

  {
    title: "Condolence & Tribute",
    occasionType: "CONDOLENCE",

    thumbnailUrl:
      "https://placehold.co/600x750/111111/ffffff?text=Condolence",

    backgroundUrl:
      "https://placehold.co/1080x1350/111111/ffffff?text=Condolence",

    layoutConfig: {
      width: 1080,
      height: 1350,
      photoSlots: 1,

      textSlots: [
        "occasion",
        "headline",
        "name",
        "designation",
        "organization",
        "location",
      ],

      colors: [
        "#111111",
        "#333333",
        "#ffffff",
      ],
    },

    isActive: true,
  },

  {
    title: "Campaign",
    occasionType: "CAMPAIGN",

    thumbnailUrl:
      "https://placehold.co/600x750/1e3a8a/ffffff?text=Campaign",

    backgroundUrl:
      "https://placehold.co/1080x1350/1e3a8a/ffffff?text=Campaign",

    layoutConfig: {
      width: 1080,
      height: 1350,
      photoSlots: 3,

      textSlots: [
        "occasion",
        "headline",
        "name",
        "designation",
        "organization",
        "location",
      ],

      colors: [
        "#1e3a8a",
        "#ffffff",
        "#dbeafe",
      ],
    },

    isActive: true,
  },
];

const seed = async () => {
  try {
    await connectDB();

    await Template.deleteMany({});

    await Template.insertMany(templates);

    console.log("✅ Templates seeded successfully");
    console.log(`✅ ${templates.length} templates created`);

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("❌ Template seed failed:", error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seed();