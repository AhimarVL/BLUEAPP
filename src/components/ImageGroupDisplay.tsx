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
      {/* Se ha eliminado el encabezado del código del producto de aquí */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
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