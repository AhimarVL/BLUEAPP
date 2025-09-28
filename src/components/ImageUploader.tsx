"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";

interface ImageFile {
  dataUrl: string;
  filename: string;
}

interface ImageUploaderProps {
  onImagesSelected: (images: ImageFile[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesSelected }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragActive(false);
      const newImages: ImageFile[] = [];
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push({
              dataUrl: e.target.result as string,
              filename: file.name,
            });
            if (newImages.length === acceptedFiles.length) {
              onImagesSelected(newImages);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    },
    [onImagesSelected]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".gif", ".webp", ".svg"],
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "w-full max-w-2xl p-6 text-center transition-all duration-300 ease-in-out cursor-pointer",
        "border-2 rounded-3xl",
        isDragActive
          ? "border-primary bg-primary/10 text-primary"
          : "border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300",
        "bg-[#27292b]" // Añadido el color de fondo
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-3">
        <UploadCloud className="h-12 w-12" />
        {isDragActive ? (
          <p className="text-lg font-medium">Suelta las imágenes aquí...</p>
        ) : (
          <p className="text-lg font-medium">
            Arrastra y suelta imágenes aquí, o haz clic para seleccionar
          </p>
        )}
        <p className="text-sm text-gray-500">
          (JPG, PNG, GIF, WEBP, SVG)
        </p>
      </div>
    </Card>
  );
};

export default ImageUploader;