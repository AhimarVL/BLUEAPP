"use client";

import React, { useState, useMemo } from "react";
import ImageUploader from "@/components/ImageUploader";
import WatermarkPreview from "@/components/WatermarkPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Herramienta de Marca de Agua por Lotes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <ImageUploader onImagesSelected={setSelectedImages} />

          {Object.keys(groupedImages).length > 0 && (
            <div className="w-full space-y-8">
              <h2 className="text-2xl font-semibold text-center">Imágenes Agrupadas y Previsualización</h2>
              {Object.entries(groupedImages).map(([code, images]) => (
                <div key={code} className="border p-4 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-center">Código: {code}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                    {images.map((image, index) => (
                      // Render two previews for each image, one for each watermark
                      <React.Fragment key={`${code}-${index}`}>
                        {watermarkImages.map((wmSrc, wmIndex) => (
                          <WatermarkPreview
                            key={`${code}-${index}-${wmIndex}`}
                            image={image}
                            watermarkImageSrc={wmSrc}
                          />
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {selectedImages.length === 0 && (
            <p className="text-muted-foreground text-center">Carga imágenes para empezar.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WatermarkTool;