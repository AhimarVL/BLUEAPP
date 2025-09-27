"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface WatermarkPreviewProps {
  image: { dataUrl: string; filename: string } | null;
  watermarkImageSrc: string; // Changed from watermarkTexts to watermarkImageSrc
}

const WatermarkPreview: React.FC<WatermarkPreviewProps> = ({
  image,
  watermarkImageSrc,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image?.dataUrl) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = image.dataUrl;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Draw watermark image
      if (watermarkImageSrc) {
        const watermarkImg = new Image();
        watermarkImg.src = watermarkImageSrc;
        watermarkImg.onload = () => {
          // Draw watermark to cover the entire canvas
          ctx.globalAlpha = 0.5; // Set transparency for the watermark
          ctx.drawImage(watermarkImg, 0, 0, canvas.width, canvas.height); // Draw from (0,0) to cover full width/height
          ctx.globalAlpha = 1.0; // Reset transparency
        };
      }
    };
  }, [image, watermarkImageSrc]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas && image) {
      const link = document.createElement("a");
      const originalFilename = image.filename.split(".").slice(0, -1).join(".");
      const watermarkName = watermarkImageSrc.split('/').pop()?.split('.')[0] || 'watermarked';
      link.download = `${originalFilename}-${watermarkName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 p-4 border rounded-md bg-white dark:bg-gray-800">
      {image ? (
        <>
          <p className="text-sm text-muted-foreground">{image.filename}</p>
          <div className="border rounded-md overflow-hidden max-w-full h-auto">
            <canvas ref={canvasRef} className="max-w-full h-auto" style={{ maxWidth: "300px", maxHeight: "300px" }} />
          </div>
          <Button onClick={handleDownload}>
            Descargar
          </Button>
        </>
      ) : (
        <p className="text-muted-foreground">Carga una imagen para previsualizarla.</p>
      )}
    </div>
  );
};

export default WatermarkPreview;