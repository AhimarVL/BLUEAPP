"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import CanvasEditor from "@/components/CanvasEditor"; // Import the new editor component
import { toast } from "sonner";
import { saveAs } from "file-saver";

interface ImageFile {
  dataUrl: string;
  filename: string;
}

interface CanvasEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageFile[];
}

const CanvasEditorDialog: React.FC<CanvasEditorDialogProps> = ({
  isOpen,
  onClose,
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);

  // Set the first image as selected when the dialog opens or images change
  useEffect(() => {
    if (isOpen && images.length > 0 && !selectedImage) {
      setSelectedImage(images[0]);
    } else if (isOpen && images.length === 0) {
      setSelectedImage(null);
    }
  }, [isOpen, images, selectedImage]);

  const handleDownloadCanvas = (dataUrl: string, filename: string) => {
    saveAs(dataUrl, filename);
    toast.success(`"${filename}" descargado exitosamente.`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl p-8 bg-card border border-border rounded-xl shadow-lg flex flex-col max-h-[95vh]">
        <DialogHeader className="pb-4 text-center flex-shrink-0">
          <DialogTitle className="text-3xl font-bold text-foreground">
            Editor de Imágenes para Lienzo
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Selecciona una imagen para ajustarla en el lienzo de 500x300 píxeles.
            Puedes moverla y hacer zoom para encajar el producto.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-grow flex flex-col lg:flex-row gap-6 mt-6 overflow-hidden">
          {/* Main Canvas Editor Area */}
          <div className="flex-grow flex items-center justify-center min-h-[350px] lg:min-h-full">
            {selectedImage ? (
              <CanvasEditor image={selectedImage} onDownload={handleDownloadCanvas} />
            ) : (
              <p className="text-xl text-gray-500 dark:text-gray-400 text-center p-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl w-full max-w-xl mx-auto bg-gray-100 dark:bg-gray-800">
                Selecciona una imagen de la lista de abajo para empezar a editar.
              </p>
            )}
          </div>

          {/* Image Selection Thumbnails */}
          <div className="lg:w-1/4 flex-shrink-0">
            <h4 className="text-lg font-semibold text-foreground mb-3 text-center lg:text-left">Tus Imágenes</h4>
            <ScrollArea className="h-[200px] lg:h-[calc(95vh-250px)] w-full pr-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {images.length === 0 ? (
                  <p className="col-span-full text-sm text-muted-foreground text-center">
                    No hay imágenes cargadas.
                  </p>
                ) : (
                  images.map((img, index) => (
                    <div
                      key={`${img.filename}-${index}`}
                      className={`relative w-24 h-24 rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-200
                        ${selectedImage?.filename === img.filename ? "border-primary ring-2 ring-primary" : "border-border hover:border-primary/50"}`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img.dataUrl}
                        alt={img.filename}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex justify-end mt-8 flex-shrink-0">
          <Button onClick={onClose} className="px-6 py-3 text-base bg-primary text-primary-foreground hover:bg-primary/90">
            Cerrar Editor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CanvasEditorDialog;