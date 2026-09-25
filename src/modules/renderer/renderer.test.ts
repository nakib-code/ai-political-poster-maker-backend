import fs from "node:fs/promises";
import { renderPoster } from "./renderer.service.js";

const main = async () => {
  const image = await renderPoster({
    name: "Nakibul Islam",

    designation: "Full Stack Developer",

    organization: "Example Organization",

    union: "Guwakhola",

    thana: "Damudya",

    district: "Shariatpur",

    occasion: "বিজয় দিবস",

    headline: "বিজয় দিবসের শুভেচ্ছা",

    photoUrls: [
      "https://res.cloudinary.com/dsb8azmea/image/upload/v1790350810/ai-political-poster/zjfhuzjokkxssxwe7d8b.png",
      "https://res.cloudinary.com/dsb8azmea/image/upload/v1790350808/ai-political-poster/o8tyz1dpq3wqoyu2lolp.jpg",
      "https://res.cloudinary.com/dsb8azmea/image/upload/v1790350808/ai-political-poster/wtxnqrf0eetdb2ye9g5k.jpg",
    ],

    layout: {
      backgroundStyle: "green and red gradient",

      primaryColor: "#006a4e",

      secondaryColor: "#f42a41",

      textAlignment: "center",

      photoArrangement: "horizontal",

      decoration: "clean geometric border",

      fontStyle: "bold",
    },
  });

  await fs.writeFile("test-output.png", image);

  console.log(
    "Poster generated successfully: test-output.png"
  );
};

main().catch((error) => {
  console.error(
    "Poster generation failed:",
    error
  );

  process.exit(1);
});