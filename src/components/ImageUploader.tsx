"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploaderProps {
  onImageSelected: (imageDataUrl: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onImageSelected(null);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Cargar Imagen (1500x1500)</Label>
      <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} />
      <p className="text-sm text-muted-foreground">
        Por favor, sube una imagen de 1500x1500 píxeles.
      </p>
    </div>
  );
};

export default ImageUploader;