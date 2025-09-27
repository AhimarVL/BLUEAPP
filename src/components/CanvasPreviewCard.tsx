"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { generateProductCanvasImage } from "@/utils/imageProcessingUtils";
import { saveAs } from "file-saver";

interface ImageFile {
  dataUrl: string;
  filename: string;
}

interface CanvasPreviewCardProps {
  image: ImageFile;
}

const CanvasPreviewCard: React.FC<CanvasPreviewCardProps> = ({ image }) => {
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
        console.error("Error generating canvas image:", err);
        setError("Error inesperado al generar la imagen de lienzo.");
      } finally {
        setIsLoading(false);
      }
    };

    generateCanvas();
  }, [image.dataUrl]);

  const handleDownload = () => {
    if (canvasDataUrl) {
      const link = document.createElement("a");
      const originalFilename = image.filename.split(".").slice(0, -1).join(".");
      link.download = `${originalFilename}-Lienzo.png`;
      link.href = canvasDataUrl;
      link.click();
    }
  };

  return (
    <Card className="flex flex-col items-center space-y-4 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-card border border-border rounded-lg w-full max-w-[300px]">
      <CardHeader className="pb-2 w-full">
        <CardTitle className="text-base font-medium text-foreground text-center break-all px-1">
          {image.filename}
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col items-center gap-4">
        <div className="flex flex-col items-center space-y-2 w-full">
          <p className="text-sm text-muted-foreground">Original</p>
          <div className="border border-border rounded-md overflow-hidden w-full aspect-video flex items-center justify-center bg-white dark:bg-gray-950">
            <img
              src={image.dataUrl}
              alt={image.filename}
              className="max-w-full max-h-full object-contain p-1"
            />
          </div>
        </div>

        <div className="flex flex-col items-center space-y-2 w-full">
          <p className="text-sm text-muted-foreground">Lienzo (500x300)</p>
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
        </div>

        <Button
          onClick={handleDownload}
          disabled={isLoading || !canvasDataUrl}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Generando...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" /> Descargar Lienzo
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CanvasPreviewCard;