"use client";

import React, { useState, useMemo } from "react";
import ImageUploader from "@/components/ImageUploader";
import OriginalImageCard from "@/components/OriginalImageCard";
import ImagePreviewDialog from "@/components/ImagePreviewDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Import Button
import { Download } from "lucide-react"; // Import icon

// Import watermark images
import ipsWatermark from "@/assets/ips.png";
import rtgWatermark from "@/assets/rtg.png";

interface ImageFile {
  dataUrl: string;
  filename: string;
}

interface GroupedImages {
  [code: string]: ImageFile[];
}

const WatermarkTool: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageToPreview, setImageToPreview] = useState<ImageFile | null>(null);
  const watermarkImages = [ipsWatermark, rtgWatermark];
  const [isDownloading, setIsDownloading] = useState(false); // New state for download loading

  const groupedImages = useMemo(() => {
    const groups: GroupedImages = {};
    selectedImages.forEach((image) => {
      const match = image.filename.match(/^([a-zA-Z0-9_]+)(-\d+)?\.\w+$/);
      const code = match ? match[1] : "Sin Código";

      if (!groups[code]) {
        groups[code] = [];
      }
      groups[code].push(image);
    });
    return groups;
  }, [selectedImages]);

  const handleViewImage = (image: ImageFile) => {
    setImageToPreview(image);
    setIsDialogOpen(true);
  };

  // Placeholder for the new download logic
  const handleDownloadAll = async () => {
    setIsDownloading(true);
    // Actual download logic will go here
    console.log("Iniciando descarga de todas las imágenes...");
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate download time
    console.log("Descarga completada (simulada).");
    setIsDownloading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gradient-to-br from-gray-950 to-black dark:from-gray-950 dark:to-black text-gray-100">
      <Card className="w-full max-w-6xl shadow-2xl rounded-xl overflow-hidden border border-primary/30 bg-card/70 backdrop-blur-lg">
        <CardHeader className="bg-gradient-to-r from-primary to-purple-700 text-primary-foreground p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-40 animate-pulse-slow"></div>
          <CardTitle className="text-5xl font-extrabold tracking-tight drop-shadow-lg relative z-10">
            Herramienta de Marca de Agua por Lotes
          </CardTitle>
          <p className="text-xl opacity-90 mt-3 font-light relative z-10">
            Carga tus imágenes, las agruparemos y aplicaremos marcas de agua automáticamente.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-10 p-10 bg-card/50 backdrop-blur-sm">
          <ImageUploader onImagesSelected={setSelectedImages} />

          {Object.keys(groupedImages).length > 0 && (
            <div className="w-full space-y-12">
              <h2 className="text-4xl font-bold text-center text-foreground">
                Imágenes Agrupadas
              </h2>
              {Object.entries(groupedImages).map(([code, images]) => (
                <div key={code} className="border border-primary/30 p-8 rounded-lg shadow-lg bg-background/30 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-20"></div>
                  <h3 className="text-3xl font-semibold mb-8 text-center flex items-center justify-center gap-4 text-primary relative z-10">
                    Código: <Badge variant="outline" className="text-xl px-5 py-2.5 bg-primary/10 text-primary border-primary/30">{code}</Badge>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
                    {images.map((image, index) => (
                      <OriginalImageCard
                        key={`${code}-${index}`}
                        image={image}
                        onView={handleViewImage}
                      />
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-center mt-10">
                <Button
                  onClick={handleDownloadAll}
                  disabled={isDownloading}
                  className="px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                >
                  {isDownloading ? "Preparando descarga..." : "Descargar Todo"}
                  <Download className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
          {selectedImages.length === 0 && (
            <p className="text-2xl text-muted-foreground text-center p-12 border-2 border-dashed border-border rounded-xl w-full max-w-xl bg-muted/20">
              Carga imágenes para empezar a ver las previsualizaciones.
            </p>
          )}
        </CardContent>
      </Card>

      {imageToPreview && (
        <ImagePreviewDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          originalImage={imageToPreview}
          watermarkImages={watermarkImages}
        />
      )}
    </div>
  );
};

export default WatermarkTool;