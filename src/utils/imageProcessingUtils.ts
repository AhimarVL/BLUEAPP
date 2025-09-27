"use client";

/**
 * Generates a product image on a 500x300 canvas with a 10% margin,
 * intelligently fitting the original image content within the safe area.
 * @param originalImageDataUrl The data URL of the original image.
 * @returns A Promise that resolves with the data URL of the generated image, or null if an error occurs.
 */
export const generateProductCanvasImage = (
  originalImageDataUrl: string,
): Promise<string | null> => {
  return new Promise((resolve) => {
    const canvasWidth = 500;
    const canvasHeight = 300;
    const marginPercentage = 0.10; // 10% margin

    const marginX = canvasWidth * marginPercentage;
    const marginY = canvasHeight * marginPercentage;

    const safeAreaWidth = canvasWidth - 2 * marginX;
    const safeAreaHeight = canvasHeight - 2 * marginY;

    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Failed to get 2D context for canvas.");
      resolve(null);
      return;
    }

    // Fill canvas with white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const originalImg = new Image();
    originalImg.src = originalImageDataUrl;

    originalImg.onload = () => {
      const imgAspectRatio = originalImg.width / originalImg.height;
      const safeAreaAspectRatio = safeAreaWidth / safeAreaHeight;

      let drawWidth: number;
      let drawHeight: number;

      // Calculate dimensions to fit within safe area while maintaining aspect ratio
      if (imgAspectRatio > safeAreaAspectRatio) {
        // Image is wider than safe area, fit by width
        drawWidth = safeAreaWidth;
        drawHeight = safeAreaWidth / imgAspectRatio;
      } else {
        // Image is taller than safe area, fit by height
        drawHeight = safeAreaHeight;
        drawWidth = safeAreaHeight * imgAspectRatio;
      }

      // Calculate position to center the image within the safe area
      const drawX = marginX + (safeAreaWidth - drawWidth) / 2;
      const drawY = marginY + (safeAreaHeight - drawHeight) / 2;

      ctx.drawImage(originalImg, drawX, drawY, drawWidth, drawHeight);

      resolve(canvas.toDataURL("image/png"));
    };

    originalImg.onerror = (error) => {
      console.error("Error loading original image for product canvas:", error);
      resolve(null);
    };
  });
};