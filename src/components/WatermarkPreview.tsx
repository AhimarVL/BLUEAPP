"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface WatermarkPreviewProps {
  image: { dataUrl: string; filename: string } | null;
  watermarkTexts: string[];
}

const WatermarkPreview: React.FC<WatermarkPreviewProps> = ({
  image,
  watermarkTexts,
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

      if (watermarkTexts && watermarkTexts.length > 0) {
        ctx.font = "bold 72px Arial";
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 5;

        const padding = 50;

        // Watermark 1: IPS (Top-Left)
        const text1 = watermarkTexts[0];
        if (text1) {
          ctx.textAlign = "left";
          ctx.textBaseline = "top";
          ctx.fillText(text1, padding, padding);
        }

        // Watermark 2: RTG (Bottom-Right)
        const text2 = watermarkTexts[1];
        if (text2) {
          ctx.textAlign = "right";
          ctx.textBaseline = "bottom";
          ctx.fillText(text2, canvas.width - padding, canvas.height - padding);
        }

        // Reset shadow
        ctx.shadowColor = "transparent";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
      }
    };
  }, [image, watermarkTexts]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas && image) {
      const link = document.createElement("a");
      const originalFilename = image.filename.split(".").slice(0, -1).join(".");
      link.download = `${originalFilename}-watermarked.png`;
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