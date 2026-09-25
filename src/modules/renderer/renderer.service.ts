import sharp from "sharp";
import type { RenderPosterInput } from "./renderer.interface.js";

const WIDTH = 1080;
const HEIGHT = 1350;

const escapeXml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

const downloadImage = async (
  url: string
): Promise<Buffer> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download image: ${url}`);
  }

  return Buffer.from(await response.arrayBuffer());
};

const createPhoto = async (
  url: string,
  width: number,
  height: number
): Promise<string> => {
  const buffer = await downloadImage(url);

  const resized = await sharp(buffer)
    .resize(width, height, {
      fit: "cover",
      position: "center",
    })
    .png()
    .toBuffer();

  const base64 = resized.toString("base64");

  return `data:image/png;base64,${base64}`;
};

export const renderPoster = async (
  input: RenderPosterInput
): Promise<Buffer> => {
  const {
    name,
    designation,
    organization,
    union,
    thana,
    district,
    occasion,
    headline,
    photoUrls,
    layout,
  } = input;

  const primaryColor =
    layout.primaryColor || "#006a4e";

  const secondaryColor =
    layout.secondaryColor || "#f42a41";

  const location = [union, thana, district]
    .filter(Boolean)
    .join(", ");

  let photoMarkup = "";

  if (photoUrls.length === 1) {
    const photo = await createPhoto(
      photoUrls[0],
      520,
      390
    );

    photoMarkup = `
      <image
        href="${photo}"
        x="280"
        y="320"
        width="520"
        height="390"
        preserveAspectRatio="xMidYMid slice"
      />

      <rect
        x="280"
        y="320"
        width="520"
        height="390"
        rx="25"
        fill="none"
        stroke="#ffffff"
        stroke-width="8"
      />
    `;
  }

  if (photoUrls.length === 2) {
    const photo1 = await createPhoto(
      photoUrls[0],
      400,
      350
    );

    const photo2 = await createPhoto(
      photoUrls[1],
      400,
      350
    );

    photoMarkup = `
      <image
        href="${photo1}"
        x="110"
        y="340"
        width="400"
        height="350"
        preserveAspectRatio="xMidYMid slice"
      />

      <image
        href="${photo2}"
        x="570"
        y="340"
        width="400"
        height="350"
        preserveAspectRatio="xMidYMid slice"
      />

      <rect
        x="110"
        y="340"
        width="400"
        height="350"
        rx="25"
        fill="none"
        stroke="#ffffff"
        stroke-width="8"
      />

      <rect
        x="570"
        y="340"
        width="400"
        height="350"
        rx="25"
        fill="none"
        stroke="#ffffff"
        stroke-width="8"
      />
    `;
  }

  if (photoUrls.length >= 3) {
    const photo1 = await createPhoto(
      photoUrls[0],
      270,
      330
    );

    const photo2 = await createPhoto(
      photoUrls[1],
      270,
      330
    );

    const photo3 = await createPhoto(
      photoUrls[2],
      270,
      330
    );

    photoMarkup = `
      <image
        href="${photo1}"
        x="75"
        y="350"
        width="270"
        height="330"
        preserveAspectRatio="xMidYMid slice"
      />

      <image
        href="${photo2}"
        x="405"
        y="350"
        width="270"
        height="330"
        preserveAspectRatio="xMidYMid slice"
      />

      <image
        href="${photo3}"
        x="735"
        y="350"
        width="270"
        height="330"
        preserveAspectRatio="xMidYMid slice"
      />

      <rect
        x="75"
        y="350"
        width="270"
        height="330"
        rx="25"
        fill="none"
        stroke="#ffffff"
        stroke-width="8"
      />

      <rect
        x="405"
        y="350"
        width="270"
        height="330"
        rx="25"
        fill="none"
        stroke="#ffffff"
        stroke-width="8"
      />

      <rect
        x="735"
        y="350"
        width="270"
        height="330"
        rx="25"
        fill="none"
        stroke="#ffffff"
        stroke-width="8"
      />
    `;
  }

  const svg = `
    <svg
      width="${WIDTH}"
      height="${HEIGHT}"
      viewBox="0 0 ${WIDTH} ${HEIGHT}"
      xmlns="http://www.w3.org/2000/svg"
    >

      <defs>
        <linearGradient
          id="background"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stop-color="${primaryColor}"
          />

          <stop
            offset="100%"
            stop-color="${secondaryColor}"
          />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect
        width="${WIDTH}"
        height="${HEIGHT}"
        fill="url(#background)"
      />

      <!-- Dark overlay -->
      <rect
        width="${WIDTH}"
        height="${HEIGHT}"
        fill="#000000"
        opacity="0.16"
      />

      <!-- Top border -->
      <rect
        x="40"
        y="40"
        width="1000"
        height="8"
        rx="4"
        fill="#ffffff"
        opacity="0.85"
      />

      <!-- Occasion -->
      <text
        x="540"
        y="125"
        text-anchor="middle"
        fill="#ffffff"
        font-size="34"
        font-weight="bold"
        font-family="Arial, sans-serif"
      >
        ${escapeXml(occasion)}
      </text>

      <!-- Headline -->
      <text
        x="540"
        y="220"
        text-anchor="middle"
        fill="#ffffff"
        font-size="58"
        font-weight="bold"
        font-family="Arial, sans-serif"
      >
        ${escapeXml(headline)}
      </text>

      <!-- Photos -->
      ${photoMarkup}

      <!-- Name -->
      <text
        x="540"
        y="820"
        text-anchor="middle"
        fill="#ffffff"
        font-size="52"
        font-weight="bold"
        font-family="Arial, sans-serif"
      >
        ${escapeXml(name)}
      </text>

      <!-- Designation -->
      ${
        designation
          ? `
            <text
              x="540"
              y="875"
              text-anchor="middle"
              fill="#ffffff"
              font-size="30"
              font-family="Arial, sans-serif"
            >
              ${escapeXml(designation)}
            </text>
          `
          : ""
      }

      <!-- Organization -->
      ${
        organization
          ? `
            <text
              x="540"
              y="925"
              text-anchor="middle"
              fill="#ffffff"
              font-size="28"
              font-family="Arial, sans-serif"
            >
              ${escapeXml(organization)}
            </text>
          `
          : ""
      }

      <!-- Location -->
      ${
        location
          ? `
            <text
              x="540"
              y="980"
              text-anchor="middle"
              fill="#ffffff"
              font-size="26"
              font-family="Arial, sans-serif"
            >
              ${escapeXml(location)}
            </text>
          `
          : ""
      }

      <!-- Footer -->
      <text
        x="540"
        y="1200"
        text-anchor="middle"
        fill="#ffffff"
        font-size="24"
        font-family="Arial, sans-serif"
      >
        AI Political Poster Maker
      </text>

      <!-- Bottom border -->
      <rect
        x="40"
        y="1260"
        width="1000"
        height="8"
        rx="4"
        fill="#ffffff"
        opacity="0.85"
      />

    </svg>
  `;

  return sharp(Buffer.from(svg))
    .png()
    .toBuffer();
};