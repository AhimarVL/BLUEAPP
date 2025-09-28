"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, // Importar DialogTitle
  DialogDescription, // Importar DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ImageUploader";
import UploadedImagePreviews from "@/components/UploadedImagePreviews";
import { Slider } from "@/components/ui/slider"; // Importar Slider
import { Label } from "@/components/ui/label"; // Importar Label
import { toast } from "sonner"; // Importar toast para notificaciones

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
  const [borderRadius, setBorderRadius] = useState(12); // Valor por defecto para rounded-xl

  // Cargar el radio del borde guardado desde localStorage al montar
  useEffect(() => {
    const savedRadius = localStorage.getItem("imageUploaderBorderRadius");
    if (savedRadius) {
      setBorderRadius(parseFloat(savedRadius));
    }
  }, []);

  // Guardar el radio del borde en localStorage
  const handleSaveConfig = () => {
    localStorage.setItem("imageUploaderBorderRadius", borderRadius.toString());
    toast.success("Configuración de borde guardada.");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-lg pt-4 px-8 pb-8 bg-[#27292b] rounded-2xl shadow-lg flex flex-col max-h-[90vh] border-none"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="pb-4 text-center flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-gray-100">Cargar Imágenes</DialogTitle>
          <DialogDescription className="text-gray-400">
            Arrastra y suelta tus imágenes o haz clic para seleccionarlas.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-6 flex-grow overflow-hidden">
          <div className="mt-0 flex-shrink-0 mx-auto w-full max-w-lg">
            <ImageUploader onImagesSelected={onImagesSelected} borderRadius={borderRadius} />
          </div>
          
          {/* Controles para el radio del borde */}
          <div className="mx-auto w-full max-w-lg flex flex-col gap-4 p-4 border border-gray-700 rounded-xl bg-[#27292b]">
            <Label htmlFor="border-radius-slider" className="text-gray-200 text-lg font-medium">
              Radio del Borde del Cargador ({borderRadius}px)
            </Label>
            <Slider
              id="border-radius-slider"
              min={0}
              max={50}
              step={1}
              value={[borderRadius]}
              onValueChange={(value) => setBorderRadius(value[0])}
              className="w-full"
            />
            <Button
              onClick={handleSaveConfig}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              Guardar Configuración de Borde
            </Button>
          </div>

          {hasImages && (
            <div className="flex-grow overflow-y-auto border border-gray-700 rounded-xl p-4 bg-[#27292b] mx-auto w-full max-w-lg">
              <UploadedImagePreviews images={selectedImages} onRemoveImage={onRemoveImage} />
            </div>
          )}
        </div>

        <div className="flex justify-end mt-8 gap-4 flex-shrink-0">
          <Button 
            onClick={onClose} 
            className="px-6 py-3 text-base bg-gray-700 text-white hover:bg-gray-600 border border-gray-700 hover:border-gray-600"
          >
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