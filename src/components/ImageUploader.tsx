"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImagesSelected: (images: { dataUrl: string; filename: string }[]) => void;
  borderRadius?: number; // Nueva prop para el radio del borde
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesSelected, borderRadius }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    const files = (event as React.ChangeEvent<HTMLInputElement>).target?.files || (event as React.DragEvent<HTMLDivElement>).dataTransfer?.files;

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

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFileChange(event);
  };

  const handleClickCard = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card
      className={cn(
        "w-full max-w-lg p-6 text-center transition-all duration-300 ease-in-out cursor-pointer",
        "border-2", // Mantener border-2
        isDragging
          ? "border-primary bg-primary/5"
          : "border-gray-700 bg-[#27292b] hover:border-primary/80 hover:bg-gray-800",
      )}
      style={{ borderRadius: borderRadius !== undefined ? `${borderRadius}px` : undefined }} // Aplicar el radio del borde
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClickCard}
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-gray-100">
          Cargar Archivos
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <UploadCloud className="h-16 w-16 text-primary" />
        <p className="text-lg font-medium text-gray-200">
          Arrastra y suelta tus archivos aquí
        </p>
        <p className="text-sm text-gray-400">o haz click para buscar</p>
        <Input
          id="pictures"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
};

export default ImageUploader;