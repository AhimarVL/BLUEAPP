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
      <DialogContent className="max-w-4xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Previsualización de Imagen: {originalImage.filename}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Aquí puedes ver la imagen original y sus versiones con marca de agua.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Original Image */}
          <div className="flex flex-col items-center space-y-3 p-4 border rounded-md bg-gray-50 dark:bg-gray-700 shadow-sm">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Original</p>
            <div className="border border-gray-200 dark:border-gray-600 rounded-md overflow-hidden w-full aspect-square flex items-center justify-center">
              <img
                src={originalImage.dataUrl}
                alt={originalImage.filename}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {/* No download button for original here, can add if needed */}
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
        <div className="flex justify-end mt-6">
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;