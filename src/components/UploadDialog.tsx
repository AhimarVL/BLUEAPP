"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import UploadedImagePreviews from "./UploadedImagePreviews";

interface ImageFile {
  dataUrl: string;
  filename: string;
}

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImagesSelected: (images: ImageFile[]) => void;
  onConfirm: () => void;
  hasImages: boolean;
  selectedImages: ImageFile[];
  onRemoveImage: (filename: string) => void;
}

const UploadDialog: React.FC<UploadDialogProps> = ({
  isOpen,
  onClose,
  onImagesSelected,
  onConfirm,
  hasImages,
  selectedImages,
  onRemoveImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const newImages: ImageFile[] = [];
      const existingFilenames = new Set(selectedImages.map((img) => img.filename));

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
          if (existingFilenames.has(file.name)) {
            toast.warning(`La imagen "${file.name}" ya ha sido cargada y se omitirá.`);
            continue;
          }
          const dataUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
          newImages.push({ dataUrl, filename: file.name });
        } else {
          toast.error(`El archivo "${file.name}" no es una imagen válida y se omitirá.`);
        }
      }

      if (newImages.length > 0) {
        onImagesSelected(newImages);
        toast.success(`${newImages.length} imagen(es) cargada(s) exitosamente.`);
      }
    },
    [onImagesSelected, selectedImages]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      handleFileChange(e.dataTransfer.files);
    },
    [handleFileChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[800px] max-h-[90vh] flex flex-col p-4 bg-background text-foreground rounded-lg shadow-xl"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full opacity-100 bg-background hover:bg-accent hover:opacity-70 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Cerrar</span>
        </Button>

        <div
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors duration-200 ${
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
              : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
          }`}
        >
          <UploadCloud className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Arrastra y suelta tus imágenes aquí
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            o haz clic para seleccionar archivos
          </p>
          <Input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files)}
            className="hidden"
            ref={fileInputRef}
          />
          <Button onClick={handleBrowseClick} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Seleccionar Archivos
          </Button>
        </div>

        {selectedImages.length > 0 && (
          <div className="mt-6 flex-grow overflow-y-auto pr-2 -mr-2">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Imágenes Cargadas ({selectedImages.length})
            </h3>
            <UploadedImagePreviews
              images={selectedImages}
              onRemoveImage={onRemoveImage}
            />
          </div>
        )}

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!hasImages}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
          >
            Confirmar Carga
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;