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
import { ScrollArea } from "@/components/ui/scroll-area";
import CanvasPreviewCard from "@/components/CanvasPreviewCard";

interface ImageFile {
  dataUrl: string;
  filename: string;
}

interface CanvasPreviewsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageFile[];
}

const CanvasPreviewsDialog: React.FC<CanvasPreviewsDialogProps> = ({
  isOpen,
  onClose,
  images,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl p-8 bg-card border border-border rounded-xl shadow-lg flex flex-col max-h-[90vh]">
        <DialogHeader className="pb-4 text-center flex-shrink-0">
          <DialogTitle className="text-3xl font-bold text-foreground">
            Previsualización de Imágenes para Lienzo
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Aquí puedes ver tus imágenes originales junto con sus versiones adaptadas a un lienzo de 500x300 píxeles.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow overflow-y-auto mt-6 pr-4">
          {images.length === 0 ? (
            <p className="text-xl text-gray-500 dark:text-gray-400 text-center p-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl w-full max-w-xl mx-auto bg-gray-100 dark:bg-gray-800">
              Carga imágenes para empezar a ver las previsualizaciones de lienzo.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {images.map((image, index) => (
                <CanvasPreviewCard key={`${image.filename}-${index}`} image={image} />
              ))}
            </div>
          )}
        </ScrollArea>
        <div className="flex justify-end mt-8 flex-shrink-0">
          <Button onClick={onClose} className="px-6 py-3 text-base bg-primary text-primary-foreground hover:bg-primary/90">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CanvasPreviewsDialog;