import cloudinary from "../../config/cloudinary.js";

export const uploadImage = async (
  buffer: Buffer
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ai-political-poster",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);

        if (!result?.secure_url) {
          return reject(new Error("Image upload failed"));
        }

        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
};