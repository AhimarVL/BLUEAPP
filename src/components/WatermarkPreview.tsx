"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

interface WatermarkPreviewProps {
  image: { dataUrl: string; filename: string } | null;
  watermarkImageSrc: string;
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

  const watermarkLabel = watermarkImageSrc.includes("ips") ? "IPS" : "RTG";

  return (
    <Card className="flex flex-col items-center space-y-4 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-card border border-border rounded-lg w-full max-w-[300px]">
      {image ? (
        <>
          <p className="text-xl font-semibold text-foreground">Marca de Agua {watermarkLabel}</p>
          <div className="border border-border rounded-md overflow-hidden w-full aspect-square flex items-center justify-center bg-white dark:bg-gray-950">
            <canvas ref={canvasRef} className="max-w-full max-h-full object-contain p-1" />
          </div>
          <Button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="h-4 w-4" /> Descargar
          </Button>
        </>
      ) : (
        <p className="text-muted-foreground text-center">Carga una imagen para previsualizarla.</p>
      )}
    </Card>
  );
};

export default WatermarkPreview;