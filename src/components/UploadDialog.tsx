"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ImageUploader";
import UploadedImagePreviews from "@/components/UploadedImagePreviews"; // Mantener la importación

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
  onRemoveImage: (filename: string) => void; // Nueva prop para eliminar imágenes
}

const UploadDialog: React.FC<UploadDialogProps> = ({
  isOpen,
  onClose,
  onImagesSelected,
  onConfirm,
  hasImages,
  selectedImages,
  onRemoveImage, // Recibir la nueva prop
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-8 bg-[#1f1f1f] rounded-3xl shadow-lg flex flex-col max-h-[90vh]">
        <DialogHeader className="pb-4 text-center flex-shrink-0">
          <DialogTitle className="text-3xl font-bold text-white">
            Cargar Archivos
          </DialogTitle>
          <DialogDescription className="text-gray-300 mt-2">
            Añade tus imágenes aquí.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex-shrink-0">
          <ImageUploader onImagesSelected={onImagesSelected} />
        </div>
        
        {hasImages && (
          <div className="flex-grow overflow-y-auto mt-6 border border-gray-700 rounded-xl p-4 bg-[#27292b]">
            <h3 className="text-xl font-bold text-gray-100 mb-4 text-center">Archivos Cargados</h3>
            <UploadedImagePreviews images={selectedImages} onRemoveImage={onRemoveImage} />
          </div>
        )}

        <div className="flex justify-end mt-8 gap-4 flex-shrink-0">
          <Button onClick={onClose} variant="outline" className="px-6 py-3 text-base border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white">
            Cancelar
          </Button>
          <Button onClick={onConfirm} disabled={!hasImages} className="px-6 py-3 text-base bg-primary text-primary-foreground hover:bg-primary/90">
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;