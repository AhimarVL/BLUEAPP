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
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="pictures">Cargar Imágenes (1500x1500)</Label>
      <Input id="pictures" type="file" accept="image/*" multiple onChange={handleFileChange} />
      <p className="text-sm text-muted-foreground">
        Por favor, sube imágenes de 1500x1500 píxeles.
      </p>
    </div>
  );
};

export default ImageUploader;