"use client";

/**
 * Trims transparent or solid white/black borders from an image.
 * @param imageDataUrl The data URL of the original image.
 * @returns A Promise that resolves with the data URL of the trimmed image, or null if an error occurs.
 */
export const trimImageToContent = (imageDataUrl: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageDataUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Failed to get 2D context for trimming canvas.");
        resolve(null);
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let minX = canvas.width;
      let minY = canvas.height;
      let maxX = 0;
      let maxY = 0;

      // Function to check if a pixel is "empty" (transparent or very close to white/black)
      const isEmptyPixel = (r: number, g: number, b: number, a: number) => {
        // Consider transparent pixels as empty
        if (a < 10) return true; // Alpha threshold

        // Consider very light (white-ish) or very dark (black-ish) pixels as empty
        // This is a heuristic and might need adjustment based on typical background colors
        const brightness = (r + g + b) / 3;
        const isWhiteish = brightness > 245 && r > 240 && g > 240 && b > 240; // Close to white
        const isBlackish = brightness < 10 && r < 15 && g < 15 && b < 15; // Close to black

        return isWhiteish || isBlackish;
      };

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          if (!isEmptyPixel(r, g, b, a)) {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      // If no content found (image is entirely empty), return original or null
      if (minX > maxX || minY > maxY) {
        resolve(imageDataUrl); // No content to trim, return original
        return;
      }

      const trimmedWidth = maxX - minX + 1;
      const trimmedHeight = maxY - minY + 1;

      const trimmedCanvas = document.createElement("canvas");
      trimmedCanvas.width = trimmedWidth;
      trimmedCanvas.height = trimmedHeight;
      const trimmedCtx = trimmedCanvas.getContext("2d");

      if (!trimmedCtx) {
        console.error("Failed to get 2D context for trimmed canvas.");
        resolve(null);
        return;
      }

      trimmedCtx.drawImage(
        img,
        minX,
        minY,
        trimmedWidth,
        trimmedHeight,
        0,
        0,
        trimmedWidth,
        trimmedHeight,
      );

      resolve(trimmedCanvas.toDataURL("image/png"));
    };

    img.onerror = (error) => {
      console.error("Error loading image for trimming:", error);
      resolve(null);
    };
  });
};

/**
 * Generates a product image on a 500x300 canvas with a 10% margin,
 * intelligently fitting the original image content within the safe area.
 * @param originalImageDataUrl The data URL of the original image.
 * @returns A Promise that resolves with the data URL of the generated image, or null if an error occurs.
 */
export const generateProductCanvasImage = async (
  originalImageDataUrl: string,
): Promise<string | null> => {
  return new Promise(async (resolve) => {
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

    // First, trim the image to its actual content
    const trimmedImageDataUrl = await trimImageToContent(originalImageDataUrl);
    if (!trimmedImageDataUrl) {
      resolve(null);
      return;
    }

    const originalImg = new Image();
    originalImg.src = trimmedImageDataUrl; // Use the trimmed image

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
      console.error("Error loading original (trimmed) image for product canvas:", error);
      resolve(null);
    };
  });
};