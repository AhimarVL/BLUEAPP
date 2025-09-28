"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { XCircle } from "lucide-react";

interface ImageFile {
  dataUrl: string;
  filename: string;
}

interface UploadedImagePreviewsProps {
  images: ImageFile[];
  onRemoveImage: (filename: string) => void;
}

const UploadedImagePreviews: React.FC<UploadedImagePreviewsProps> = ({ images, onRemoveImage }) => {
  if (images.length === 0) {
    return (
      <p className="text-center text-gray-400 text-sm">
        No hay imágenes cargadas aún.
      </p>
    );
  }

  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col gap-2"> {/* Espacio entre elementos reducido */}
        {images.map((image, index) => (
          <Card key={`${image.filename}-${index}`} className="flex items-center p-2 bg-[#1f1f1f] border border-gray-700 rounded-lg shadow-sm">
            <div className="relative w-10 h-10 rounded-md overflow-hidden border border-muted flex items-center justify-center bg-background flex-shrink-0"> {/* Tamaño del thumbnail reducido */}
              <img
                src={image.dataUrl}
                alt={image.filename}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="ml-3 flex-grow text-sm text-gray-200 truncate"> {/* Margen izquierdo reducido */}
              {image.filename}
            </p>
            <button
              onClick={() => onRemoveImage(image.filename)}
              className="ml-auto p-0.5 text-gray-400 hover:text-destructive transition-colors duration-200" // Padding del botón reducido
              aria-label={`Eliminar ${image.filename}`}
            >
              <XCircle className="h-4 w-4" /> {/* Tamaño del icono reducido */}
            </button>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default UploadedImagePreviews;