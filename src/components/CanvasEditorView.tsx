"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import CanvasEditor from "@/components/CanvasEditor"; // Import the new editor component
import { toast } from "sonner";
import { saveAs } from "file-saver";

interface ImageFile {
  dataUrl: string;
  filename: string;
}

interface CanvasEditorViewProps {
  images: ImageFile[];
}

const CanvasEditorView: React.FC<CanvasEditorViewProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);

  // Set the first image as selected when images change
  useEffect(() => {
    if (images.length > 0 && !selectedImage) {
      setSelectedImage(images[0]);
    } else if (images.length === 0) {
      setSelectedImage(null);
    }
  }, [images, selectedImage]);

  const handleDownloadCanvas = (dataUrl: string, filename: string) => {
    saveAs(dataUrl, filename);
    toast.success(`"${filename}" descargado exitosamente.`);
  };

  return (
    <div className="flex flex-col h-full p-8 bg-gray-50 dark:bg-gray-900"> {/* Fondo sutil */}
      <div className="pb-4 text-center flex-shrink-0">
        <h2 className="text-3xl font-bold text-foreground">
          Editor de Imágenes para Lienzo
        </h2>
        <p className="text-muted-foreground mt-2">
          Selecciona una imagen para ajustarla en el lienzo de 500x300 píxeles. Puedes moverla y hacer zoom para encajar el producto.
        </p>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center gap-10 mt-6 overflow-hidden"> {/* Aumentado el gap */}
        {/* Main Canvas Editor Area */}
        <div className="flex-shrink-0">
          {selectedImage ? (
            <CanvasEditor image={selectedImage} onDownload={handleDownloadCanvas} />
          ) : (
            <p className="text-xl text-gray-500 dark:text-gray-400 text-center p-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl w-full max-w-xl mx-auto bg-gray-100 dark:bg-gray-800">
              Selecciona una imagen de la lista de abajo para empezar a editar.
            </p>
          )}
        </div>

        {/* Image Selection Thumbnails */}
        <div className="w-full flex-shrink-0 mt-8">
          <h4 className="text-2xl font-bold text-foreground mb-4 text-center">Tus Imágenes</h4> {/* Título más grande y negrita */}
          <ScrollArea className="h-[150px] w-full px-4">
            <div className="flex gap-4 justify-center"> {/* Aumentado el gap entre miniaturas */}
              {images.length === 0 ? (
                <p className="col-span-full text-sm text-muted-foreground text-center">
                  No hay imágenes cargadas.
                </p>
              ) : (
                images.map((img, index) => (
                  <div
                    key={`${img.filename}-${index}`}
                    className={`relative w-24 h-24 rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-200 flex-shrink-0
                      ${selectedImage?.filename === img.filename ? "border-primary ring-2 ring-primary" : "border-gray-300 dark:border-gray-700 hover:border-primary/50"}`} {/* Borde más claro */}
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
    </div>
  );
};

export default CanvasEditorView;