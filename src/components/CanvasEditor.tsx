"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Download, ZoomIn, ZoomOut, Move } from "lucide-react";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { trimImageToContent } from "@/utils/imageProcessingUtils"; // Import the new utility

interface ImageFile {
  dataUrl: string;
  filename: string;
}

interface CanvasEditorProps {
  image: ImageFile;
  onDownload: (dataUrl: string, filename: string) => void;
}

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 300;
const MARGIN_PERCENTAGE = 0.10;

const CanvasEditor: React.FC<CanvasEditorProps> = ({ image, onDownload }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [trimmedImageDataUrl, setTrimmedImageDataUrl] = useState<string | null>(null);

  // Effect to trim image when the original image changes
  useEffect(() => {
    const processImage = async () => {
      const trimmedUrl = await trimImageToContent(image.dataUrl);
      setTrimmedImageDataUrl(trimmedUrl);
    };
    processImage();
  }, [image.dataUrl]);

  const drawImageOnCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !trimmedImageDataUrl) return; // Use trimmedImageDataUrl

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = trimmedImageDataUrl; // Draw the trimmed image

    img.onload = () => {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;

      ctx.fillStyle = "#FFFFFF"; // White background
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Calculate safe area
      const marginX = CANVAS_WIDTH * MARGIN_PERCENTAGE;
      const marginY = CANVAS_HEIGHT * MARGIN_PERCENTAGE;
      const safeAreaWidth = CANVAS_WIDTH - 2 * marginX;
      const safeAreaHeight = CANVAS_HEIGHT - 2 * marginY;

      // Initial fit logic (similar to generateProductCanvasImage)
      let initialDrawWidth: number;
      let initialDrawHeight: number;
      const imgAspectRatio = img.width / img.height;
      const safeAreaAspectRatio = safeAreaWidth / safeAreaHeight;

      if (imgAspectRatio > safeAreaAspectRatio) {
        initialDrawWidth = safeAreaWidth;
        initialDrawHeight = safeAreaWidth / imgAspectRatio;
      } else {
        initialDrawHeight = safeAreaHeight;
        initialDrawWidth = safeAreaHeight * imgAspectRatio;
      }

      // Apply current scale and offset
      const scaledWidth = initialDrawWidth * scale;
      const scaledHeight = initialDrawHeight * scale;

      const drawX = marginX + (safeAreaWidth - scaledWidth) / 2 + offsetX;
      const drawY = marginY + (safeAreaHeight - scaledHeight) / 2 + offsetY;

      ctx.drawImage(img, drawX, drawY, scaledWidth, scaledHeight);

      // Draw margin lines
      ctx.strokeStyle = "rgba(255, 0, 0, 0.7)"; // Red, semi-transparent
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]); // Dashed line
      ctx.strokeRect(marginX, marginY, safeAreaWidth, safeAreaHeight);
      ctx.setLineDash([]); // Reset line dash
    };
  }, [trimmedImageDataUrl, scale, offsetX, offsetY]); // Depend on trimmedImageDataUrl

  useEffect(() => {
    drawImageOnCanvas();
  }, [drawImageOnCanvas]);

  // Reset scale and position when image or trimmed image changes
  useEffect(() => {
    setScale(1);
    setOffsetX(0);
    setOffsetY(0);
  }, [image, trimmedImageDataUrl]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    setOffsetX((prev) => prev + dx);
    setOffsetY((prev) => prev + dy);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleZoom = (value: number[]) => {
    setScale(value[0]);
  };

  const handleDownloadClick = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      const originalFilename = image.filename.split(".").slice(0, -1).join(".");
      onDownload(dataUrl, `${originalFilename}-Lienzo.png`);
    } else {
      toast.error("No se pudo generar la imagen para descargar.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 bg-card border border-border rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-foreground text-center">{image.filename}</h3>
      <div
        className="relative border border-border rounded-md overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <canvas ref={canvasRef} className="block" />
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <ZoomOut className="h-5 w-5 text-muted-foreground" />
          <Slider
            min={0.1}
            max={5}
            step={0.05}
            value={[scale]}
            onValueChange={handleZoom}
            className="w-full"
          />
          <ZoomIn className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex justify-center gap-2 text-sm text-muted-foreground">
          <Move className="h-4 w-4" /> Arrastra la imagen para moverla.
        </div>
      </div>

      <Button
        onClick={handleDownloadClick}
        disabled={!trimmedImageDataUrl}
        className="w-full max-w-xs flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Download className="h-4 w-4" /> Descargar Lienzo Editado
      </Button>
    </div>
  );
};

export default CanvasEditor;