"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, UploadCloud, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

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
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages: ImageFile[] = [];
      const existingFilenames = new Set(selectedImages.map((img) => img.filename));

      acceptedFiles.forEach((file) => {
        if (file.type.startsWith("image/")) {
          if (existingFilenames.has(file.name)) {
            toast.warning(`La imagen "${file.name}" ya ha sido cargada.`);
            return;
          }
          const reader = new FileReader();
          reader.onload = () => {
            newImages.push({
              dataUrl: reader.result as string,
              filename: file.name,
            });
            if (newImages.length === acceptedFiles.length) {
              onImagesSelected(newImages);
              toast.success(`${newImages.length} imagen(es) cargada(s) con éxito.`);
            }
          };
          reader.readAsDataURL(file);
        } else {
          toast.error(`El archivo "${file.name}" no es una imagen válida.`);
        }
      });
    },
    [onImagesSelected, selectedImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg p-8 bg-[#27292b] rounded-3xl shadow-lg flex flex-col max-h-[90vh] border-none" // Cambiado a rounded-3xl
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-3xl font-extrabold text-white">
            Cargar Imágenes
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-base">
            Arrastra y suelta tus imágenes aquí, o haz clic para seleccionarlas.
          </DialogDescription>
        </DialogHeader>

        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300
            ${isDragActive
              ? "border-blue-500 bg-blue-900/20"
              : "border-gray-600 hover:border-gray-400 bg-gray-800 hover:bg-gray-700"
            }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-lg text-gray-300 text-center">
            {isDragActive
              ? "¡Suelta las imágenes aquí!"
              : "Arrastra y suelta archivos aquí, o haz clic para seleccionar"}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            (Solo archivos .jpg, .jpeg, .png, .gif)
          </p>
        </div>

        {selectedImages.length > 0 && (
          <div className="mt-6 flex-grow min-h-0">
            <h3 className="text-xl font-semibold text-white mb-3">
              Imágenes Cargadas ({selectedImages.length})
            </h3>
            <ScrollArea className="h-48 pr-4">
              <div className="space-y-3">
                {selectedImages.map((image) => (
                  <div
                    key={image.filename}
                    className="flex items-center justify-between bg-gray-700 p-3 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center">
                      <ImageIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-200 text-sm truncate max-w-[200px]">
                        {image.filename}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveImage(image.filename)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white border-none"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!hasImages}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Confirmar Carga
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;