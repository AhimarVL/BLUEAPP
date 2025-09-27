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
      <DialogContent className="max-w-5xl p-8 bg-white border border-gray-200 rounded-xl shadow-lg">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">
            Previsualización de Imagen: {originalImage.filename}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 mt-2">
            Aquí puedes ver la imagen original y sus versiones con marca de agua.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Original Image */}
          <div className="flex flex-col items-center space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
            <p className="text-xl font-semibold text-gray-800">Original</p>
            <div className="border border-gray-200 rounded-md overflow-hidden w-full aspect-square flex items-center justify-center bg-gray-100">
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
          <Button onClick={onClose} className="px-6 py-3 text-base bg-blue-600 text-white hover:bg-blue-700">Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;