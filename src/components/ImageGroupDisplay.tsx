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
      <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
        Código del producto: {code}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center"> {/* Cambiado a 2 columnas */}
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