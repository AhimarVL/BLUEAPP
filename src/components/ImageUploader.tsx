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
    <div className="grid w-full max-w-md items-center gap-3 p-6 bg-background/50 rounded-lg shadow-md border border-border">
      <Label htmlFor="pictures" className="text-lg font-semibold text-foreground">
        Cargar Imágenes (1500x1500)
      </Label>
      <Input
        id="pictures"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="file:text-primary file:font-medium file:bg-primary/10 file:border-primary/30 file:rounded-md file:px-4 file:py-2 file:mr-4 hover:file:bg-primary/20 transition-colors duration-200"
      />
      <p className="text-sm text-muted-foreground mt-1">
        Por favor, sube imágenes de 1500x1500 píxeles para mejores resultados.
      </p>
    </div>
  );
};

export default ImageUploader;