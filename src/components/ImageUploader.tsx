"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploaderProps {
  onImagesSelected: (images: { dataUrl: string; filename: string }[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesSelected }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imagePromises = Array.from(files).map((file) => {
        return new Promise<{ dataUrl: string; filename: string }>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({ dataUrl: reader.result as string, filename: file.name });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then((images) => {
        onImagesSelected(images);
      });
    } else {
      onImagesSelected([]);
    }
  };

  return (
    <div className="grid w-full max-w-md items-center gap-3 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <Label htmlFor="pictures" className="text-lg font-semibold text-gray-800">
        Cargar Imágenes (1500x1500)
      </Label>
      <Input
        id="pictures"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="file:text-blue-600 file:font-medium file:bg-blue-50 file:border-blue-200 file:rounded-md file:px-4 file:py-2 file:mr-4 hover:file:bg-blue-100 transition-colors duration-200"
      />
      <p className="text-sm text-gray-500 mt-1">
        Por favor, sube imágenes de 1500x1500 píxeles para mejores resultados.
      </p>
    </div>
  );
};

export default ImageUploader;