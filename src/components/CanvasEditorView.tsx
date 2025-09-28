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
    <div className="flex flex-col h-full overflow-hidden"> {/* Eliminado p-8 y bg-white/dark:bg-gray-950, y añadido overflow-hidden */}
      <div className="flex-grow flex flex-col items-center justify-center gap-6 overflow-hidden"> {/* Eliminado mt-6 */}
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
          <h4 className="text-lg font-semibold text-foreground mb-3 text-center">Tus Imágenes</h4>
          <ScrollArea className="h-[150px] w-full px-4">
            <div className="flex gap-3 justify-center">
              {images.length === 0 ? (
                <p className="col-span-full text-sm text-muted-foreground text-center">
                  No hay imágenes cargadas.
                </p>
              ) : (
                images.map((img, index) => (
                  <div
                    key={`${img.filename}-${index}`}
                    className={`relative w-24 h-24 rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-200 flex-shrink-0
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
    </div>
  );
};

export default CanvasEditorView;