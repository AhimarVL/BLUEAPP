"use client";

import React from "react";
import OriginalImageCard from "@/components/OriginalImageCard";

interface ImageFile {
  dataUrl: string;
  filename: string;
}

interface ImageGroupDisplayProps {
  code: string;
  images: ImageFile[];
  onView: (image: ImageFile) => void;
}

const ImageGroupDisplay: React.FC<ImageGroupDisplayProps> = ({ code, images, onView }) => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-foreground mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        Código: {code}
      </h3>
      <div className="grid grid-cols-1 gap-6 justify-items-center"> {/* Cambiado a una sola columna */}
        {images.map((image, index) => (
          <OriginalImageCard
            key={`${image.filename}-${index}`}
            image={image}
            onView={onView}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGroupDisplay;