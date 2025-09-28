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
      const newImages: ImageFile[] = acceptedFiles.map((file) => ({
        dataUrl: URL.createObjectURL(file),
        filename: file.name,
      }));
      onImagesSelected(newImages);
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
        "w-full max-w-2xl p-6 text-center transition-all duration-300 ease-in-out cursor-pointer bg-[#27292b]", // Añadido bg-[#27292b]
        "border-2 rounded-3xl",
        isDragActive
          ? "border-primary bg-primary/10 text-primary"
          : "border-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-300"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4">
        <UploadCloud className="h-12 w-12" />
        <p className="text-lg font-medium">
          Arrastra y suelta tus imágenes aquí, o haz clic para seleccionar
        </p>
        <p className="text-sm text-gray-500">
          Soporta JPG, PNG, GIF, WEBP, SVG
        </p>
      </div>
    </Card>
  );
};

export default ImageUploader;