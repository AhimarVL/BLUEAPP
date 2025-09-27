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

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImagesSelected: (images: { dataUrl: string; filename: string }[]) => void;
  onConfirm: () => void;
  hasImages: boolean;
}

const UploadDialog: React.FC<UploadDialogProps> = ({
  isOpen,
  onClose,
  onImagesSelected,
  onConfirm,
  hasImages,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-8 bg-card border border-border rounded-xl shadow-lg">
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