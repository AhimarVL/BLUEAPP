"use client";

import React, { useState, useMemo } from "react";
import ImageUploader from "@/components/ImageUploader";
import OriginalImageCard from "@/components/OriginalImageCard"; // Import the new component
import ImagePreviewDialog from "@/components/ImagePreviewDialog"; // Import the new dialog component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
  const watermarkImages = [ipsWatermark, rtgWatermark]; // Array of watermark image paths

  const groupedImages = useMemo(() => {
    const groups: GroupedImages = {};
    selectedImages.forEach((image) => {
      // Extract code from filename, ignoring '-#' part
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
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-5xl shadow-2xl rounded-xl overflow-hidden border-none">
        <CardHeader className="bg-primary text-primary-foreground p-6 text-center">
          <CardTitle className="text-4xl font-extrabold tracking-tight">
            Herramienta de Marca de Agua por Lotes
          </CardTitle>
          <p className="text-lg opacity-90 mt-2">
            Carga tus imágenes, las agruparemos y aplicaremos marcas de agua automáticamente.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-8 p-8">
          <ImageUploader onImagesSelected={setSelectedImages} />

          {Object.keys(groupedImages).length > 0 && (
            <div className="w-full space-y-10">
              <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
                Imágenes Agrupadas
              </h2>
              {Object.entries(groupedImages).map(([code, images]) => (
                <div key={code} className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
                  <h3 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center gap-3">
                    Código: <Badge variant="secondary" className="text-lg px-4 py-1.5">{code}</Badge>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
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
            <p className="text-xl text-muted-foreground text-center p-8 border border-dashed rounded-lg w-full max-w-md">
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