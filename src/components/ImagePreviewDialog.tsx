"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WatermarkPreview from "@/components/WatermarkPreview";

interface ImagePreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  originalImage: { dataUrl: string; filename: string } | null;
  watermarkImages: string[]; // Array of watermark image paths (e.g., [ipsWatermark, rtgWatermark])
}

const ImagePreviewDialog: React.FC<ImagePreviewDialogProps> = ({
  isOpen,
  onClose,
  originalImage,
  watermarkImages,
}) => {
  if (!originalImage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-8 bg-card border border-border rounded-xl shadow-2xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-3xl font-bold text-center text-foreground">
            Previsualización de Imagen: {originalImage.filename}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground mt-2">
            Aquí puedes ver la imagen original y sus versiones con marca de agua.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {/* Original Image */}
          <div className="flex flex-col items-center space-y-4 p-5 border border-border rounded-lg bg-background/50 shadow-md">
            <p className="text-xl font-semibold text-foreground">Original</p>
            <div className="border border-border rounded-md overflow-hidden w-full aspect-square flex items-center justify-center bg-muted/20">
              <img
                src={originalImage.dataUrl}
                alt={originalImage.filename}
                className="max-w-full max-h-full object-contain p-1"
              />
            </div>
          </div>

          {/* Watermarked Images */}
          {watermarkImages.map((wmSrc, index) => (
            <WatermarkPreview
              key={index}
              image={originalImage}
              watermarkImageSrc={wmSrc}
            />
          ))}
        </div>
        <div className="flex justify-end mt-8">
          <Button onClick={onClose} className="px-6 py-3 text-lg">Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;