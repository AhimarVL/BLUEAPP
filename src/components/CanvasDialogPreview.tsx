"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { generateProductCanvasImage } from "@/utils/imageProcessingUtils";

interface CanvasDialogPreviewProps {
  image: { dataUrl: string; filename: string };
}

const CanvasDialogPreview: React.FC<CanvasDialogPreviewProps> = ({ image }) => {
  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateCanvas = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = await generateProductCanvasImage(image.dataUrl);
        if (url) {
          setCanvasDataUrl(url);
        } else {
          setError("Error al generar la imagen de lienzo.");
        }
      } catch (err) {
        console.error("Error generating canvas image for preview:", err);
        setError("Error inesperado al generar la imagen de lienzo.");
      } finally {
        setIsLoading(false);
      }
    };

    generateCanvas();
  }, [image.dataUrl]);

  return (
    <Card className="flex flex-col items-center space-y-4 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-card border border-border rounded-lg w-full max-w-[300px]">
      <p className="text-xl font-semibold text-foreground">Lienzo (500x300)</p>
      <div className="border border-border rounded-md overflow-hidden w-full aspect-video flex items-center justify-center bg-white dark:bg-gray-950">
        {isLoading ? (
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        ) : error ? (
          <p className="text-destructive text-center text-sm p-2">{error}</p>
        ) : (
          <img
            src={canvasDataUrl || ""}
            alt={`Lienzo de ${image.filename}`}
            className="max-w-full max-h-full object-contain p-1"
          />
        )}
      </div>
      {/* No hay botón de descarga aquí, ya que la descarga masiva lo gestiona */}
    </Card>
  );
};

export default CanvasDialogPreview;