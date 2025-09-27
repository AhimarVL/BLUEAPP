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
import UploadedImagePreviews from "@/components/UploadedImagePreviews";

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
}

const UploadDialog: React.FC<UploadDialogProps> = ({
  isOpen,
  onClose,
  onImagesSelected,
  onConfirm,
  hasImages,
  selectedImages,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-8 bg-card border border-border rounded-xl shadow-lg flex flex-col max-h-[90vh]"> {/* Añadido flex-col y max-h */}
        <DialogHeader className="pb-4 text-center flex-shrink-0"> {/* flex-shrink-0 para que no se encoja */}
          <DialogTitle className="text-3xl font-bold text-foreground">
            Cargar Archivos
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Añade tus imágenes aquí. Puedes subir varias a la vez.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex-shrink-0"> {/* flex-shrink-0 para que no se encoja */}
          <ImageUploader onImagesSelected={onImagesSelected} />
        </div>
        {/* Renderizar el nuevo componente de previsualización, ocupando el espacio restante */}
        <div className="flex-grow overflow-y-auto mt-6"> {/* flex-grow y overflow-y-auto para el scroll */}
          <UploadedImagePreviews images={selectedImages} />
        </div>
        <div className="flex justify-end mt-8 gap-4 flex-shrink-0"> {/* flex-shrink-0 para que no se encoja */}
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