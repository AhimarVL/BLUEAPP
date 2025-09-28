"use client";

import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { applyWatermarkToImage } from "@/utils/watermarkUtils";
import ZoomableImage from "./ZoomableImage"; // Importar el nuevo componente

interface WatermarkPreviewProps {
  image: { dataUrl: string; filename: string } | null;
  watermarkImageSrc: string;
}

const WatermarkPreview: React.FC<WatermarkPreviewProps> = ({
  image,
  watermarkImageSrc,
}) => {
  const [watermarkedDataUrl, setWatermarkedDataUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); // Mantener canvas para la descarga

  useEffect(() => {
    const generateWatermark = async () => {
      if (!image?.dataUrl || !watermarkImageSrc) {
        setWatermarkedDataUrl(null);
        return;
      }
      const result = await applyWatermarkToImage(image.dataUrl, watermarkImageSrc);
      setWatermarkedDataUrl(result);

      // También dibujar en el canvas oculto para la funcionalidad de descarga
      const canvas = canvasRef.current;
      if (canvas && result) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const img = new Image();
          img.src = result;
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
          };
        }
      }
    };
    generateWatermark();
  }, [image, watermarkImageSrc]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas && image) {
      const link = document.createElement("a");
      const originalFilename = image.filename.split(".").slice(0, -1).join(".");
      const watermarkName = watermarkImageSrc.includes("ips") ? "IPS" : "RTG";
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
          <p className="text-xl font-semibold text-foreground">{watermarkLabel}</p>
          <div className="border border-border rounded-md overflow-hidden w-full aspect-square flex items-center justify-center bg-white dark:bg-gray-950">
            {watermarkedDataUrl ? (
              <ZoomableImage
                src={watermarkedDataUrl}
                alt={`${image.filename} con marca de agua ${watermarkLabel}`}
                className="max-w-full max-h-full object-contain p-1"
                containerClassName="w-full h-full"
              />
            ) : (
              <p className="text-muted-foreground text-sm">Cargando...</p>
            )}
          </div>
          {/* Canvas oculto para la descarga */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
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