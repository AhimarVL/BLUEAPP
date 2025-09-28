"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImageFile {
  dataUrl: string;
  filename: string;
}

interface UploadedImagePreviewsProps {
  images: ImageFile[];
  onRemoveImage: (filename: string) => void;
}

const UploadedImagePreviews: React.FC<UploadedImagePreviewsProps> = ({
  images,
  onRemoveImage,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <Card 
          key={`${image.filename}-${index}`} 
          className="flex items-center p-2 bg-white/5 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/50 rounded-xl shadow-sm backdrop-blur-sm" // Glassmorphism aplicado aquí
        >
          <div className="relative w-10 h-10 rounded-md overflow-hidden border border-muted flex items-center justify-center bg-background flex-shrink-0">
            <img
              src={image.dataUrl}
              alt={image.filename}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="ml-3 flex-grow text-sm text-gray-200 truncate">
            {image.filename}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveImage(image.filename)}
            className="ml-2 h-8 w-8 text-gray-400 hover:bg-gray-700 hover:text-gray-100 flex-shrink-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Eliminar</span>
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default UploadedImagePreviews;