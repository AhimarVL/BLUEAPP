"use client";

import React, { useState, useMemo } from "react";
import ImageUploader from "@/components/ImageUploader";
import OriginalImageCard from "@/components/OriginalImageCard";
import ImagePreviewDialog from "@/components/ImagePreviewDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gradient-to-br from-gray-900 to-black dark:from-gray-950 dark:to-black text-gray-100">
      <Card className="w-full max-w-6xl shadow-2xl rounded-xl overflow-hidden border border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary to-blue-600 text-primary-foreground p-8 text-center">
          <CardTitle className="text-5xl font-extrabold tracking-tight drop-shadow-lg">
            Herramienta de Marca de Agua por Lotes
          </CardTitle>
          <p className="text-xl opacity-90 mt-3 font-light">
            Carga tus imágenes, las agruparemos y aplicaremos marcas de agua automáticamente.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-10 p-10 bg-card">
          <ImageUploader onImagesSelected={setSelectedImages} />

          {Object.keys(groupedImages).length > 0 && (
            <div className="w-full space-y-12">
              <h2 className="text-4xl font-bold text-center text-foreground">
                Imágenes Agrupadas
              </h2>
              {Object.entries(groupedImages).map(([code, images]) => (
                <div key={code} className="border border-border p-8 rounded-lg shadow-lg bg-background/50 backdrop-blur-sm">
                  <h3 className="text-3xl font-semibold mb-8 text-center flex items-center justify-center gap-4 text-primary">
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