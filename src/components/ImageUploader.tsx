"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils"; // Import cn for conditional class merging

interface ImageUploaderProps {
  onImagesSelected: (images: { dataUrl: string; filename: string }[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesSelected }) => {
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

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card
      className={cn(
        "w-full max-w-2xl p-6 text-center cursor-pointer transition-all duration-300 ease-in-out",
        "border-2 border-dashed rounded-xl",
        isDragging
          ? "border-primary bg-primary/5 dark:bg-primary/10" // Usar primary
          : "border-gray-300 bg-gray-50 hover:border-primary hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-primary dark:hover:bg-gray-700", // Usar primary
      )}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Cargar Imágenes (1500x1500)
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Arrastra y suelta tus imágenes aquí, o haz clic para seleccionarlas.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <UploadCloud className="h-16 w-16 text-primary dark:text-primary" /> {/* Usar text-primary */}
        <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Haz clic o arrastra archivos para subir
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sube imágenes de 1500x1500 píxeles para mejores resultados.
        </p>
        <Input
          id="pictures"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden" // Visually hide the input
        />
      </CardContent>
    </Card>
  );
};

export default ImageUploader;