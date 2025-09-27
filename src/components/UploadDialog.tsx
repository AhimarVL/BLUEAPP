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
import UploadedImagePreviews from "@/components/UploadedImagePreviews"; // Importar el nuevo componente

interface ImageFile { // Definir la interfaz ImageFile aquí para consistencia
  dataUrl: string;
  filename: string;
}

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImagesSelected: (images: ImageFile[]) => void;
  onConfirm: () => void;
  hasImages: boolean;
  selectedImages: ImageFile[]; // Nueva prop para pasar las imágenes seleccionadas
}

const UploadDialog: React.FC<UploadDialogProps> = ({
  isOpen,
  onClose,
  onImagesSelected,
  onConfirm,
  hasImages,
  selectedImages, // Desestructurar la nueva prop
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-8 bg-card border border-border rounded-xl shadow-lg"> {/* Aumentado el max-w */}
        <DialogHeader className="pb-4 text-center">
          <DialogTitle className="text-3xl font-bold text-foreground">
            Cargar Archivos
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Añade tus imágenes aquí. Puedes subir varias a la vez.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <ImageUploader onImagesSelected={onImagesSelected} />
        </div>
        {/* Renderizar el nuevo componente de previsualización */}
        <UploadedImagePreviews images={selectedImages} />
        <div className="flex justify-end mt-8 gap-4">
          <Button onClick={onClose} variant="outline" className="px-6 py-3 text-base">
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