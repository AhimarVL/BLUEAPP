"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WatermarkPreviewProps {
  imageSrc: string | null;
  watermarkText: string;
  onWatermarkTextChange: (text: string) => void;
}

const WatermarkPreview: React.FC<WatermarkPreviewProps> = ({
  imageSrc,
  watermarkText,
  onWatermarkTextChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Apply watermark
      if (watermarkText) {
        ctx.font = "bold 72px Arial"; // Adjust font size as needed
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; // White, semi-transparent
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Calculate text width to center it
        const textWidth = ctx.measureText(watermarkText).width;
        const x = canvas.width / 2;
        const y = canvas.height / 2;

        // Draw text with a slight shadow for better visibility
        ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 5;
        ctx.fillText(watermarkText, x, y);
        
        // Reset shadow
        ctx.shadowColor = "transparent";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
      }
    };
  }, [imageSrc, watermarkText]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.download = "watermarked-image.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="watermark-text">Texto de Marca de Agua</Label>
        <Input
          id="watermark-text"
          type="text"
          value={watermarkText}
          onChange={(e) => onWatermarkTextChange(e.target.value)}
          placeholder="Escribe tu marca de agua aquí"
        />
      </div>
      {imageSrc ? (
        <>
          <div className="border rounded-md overflow-hidden max-w-full h-auto">
            <canvas ref={canvasRef} className="max-w-full h-auto" />
          </div>
          <Button onClick={handleDownload} disabled={!imageSrc}>
            Descargar Imagen con Marca de Agua
          </Button>
        </>
      ) : (
        <p className="text-muted-foreground">Carga una imagen para previsualizarla.</p>
      )}
    </div>
  );
};

export default WatermarkPreview;