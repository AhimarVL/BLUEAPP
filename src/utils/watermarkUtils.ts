"use client";

/**
 * Applies a watermark image to an original image and returns the data URL of the watermarked image.
 * @param originalImageDataUrl The data URL of the original image.
 * @param watermarkImageDataUrl The data URL of the watermark image.
 * @returns A Promise that resolves with the data URL of the watermarked image, or null if an error occurs.
 */
export const applyWatermarkToImage = (
  originalImageDataUrl: string,
  watermarkImageDataUrl: string,
): Promise<string | null> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Failed to get 2D context for canvas.");
      resolve(null);
      return;
    }

    const originalImg = new Image();
    originalImg.src = originalImageDataUrl;

    originalImg.onload = () => {
      canvas.width = originalImg.width;
      canvas.height = originalImg.height;

      ctx.drawImage(originalImg, 0, 0);

      const watermarkImg = new Image();
      watermarkImg.src = watermarkImageDataUrl;

      watermarkImg.onload = () => {
        ctx.globalAlpha = 0.5; // Set transparency for the watermark
        ctx.drawImage(watermarkImg, 0, 0, canvas.width, canvas.height); // Draw watermark to cover the entire canvas
        ctx.globalAlpha = 1.0; // Reset transparency

        resolve(canvas.toDataURL("image/png"));
      };

      watermarkImg.onerror = (error) => {
        console.error("Error loading watermark image:", error);
        resolve(null);
      };
    };

    originalImg.onerror = (error) => {
      console.error("Error loading original image:", error);
      resolve(null);
    };
  });
};