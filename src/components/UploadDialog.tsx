"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-8 bg-[#27292b] rounded-[2rem] shadow-lg flex flex-col max-h-[90vh] border-none"> {/* Fondo ajustado, redondeo y borde eliminados */}
        <DialogHeader className="pb-4 text-center flex-shrink-0">
          {/* Títulos y descripciones eliminados */}
        </DialogHeader>
        
        <div className="flex flex-col gap-6 flex-grow overflow-hidden"> {/* Nuevo contenedor para alineación */}
          <div className="mt-6 flex-shrink-0 mx-auto w-full max-w-2xl"> {/* Centrado y ancho máximo */}
            <ImageUploader onImagesSelected={onImagesSelected} />
          </div>
          
          {hasImages && (
            <div className="flex-grow overflow-y-auto border border-gray-700 rounded-xl p-4 bg-[#27292b] mx-auto w-full max-w-2xl"> {/* Centrado y ancho máximo */}
              <h3 className="text-xl font-bold text-gray-100 mb-4 text-center">Archivos Cargados</h3>
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