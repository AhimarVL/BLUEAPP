"use client";

import React, { useState, useMemo } from "react";
import ImageUploader from "@/components/ImageUploader";
import OriginalImageCard from "@/components/OriginalImageCard";
import ImagePreviewDialog from "@/components/ImagePreviewDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw } from "lucide-react"; // Import RotateCcw icon
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { applyWatermarkToImage } from "@/utils/watermarkUtils";

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
  const [isDownloading, setIsDownloading] = useState(false);

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

  const handleImagesSelected = (newImages: ImageFile[]) => {
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleReset = () => {
    setSelectedImages([]);
    setImageToPreview(null);
    setIsDialogOpen(false);
    setIsDownloading(false);
  };

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    const zip = new JSZip();

    try {
      for (const code in groupedImages) {
        const productFolder = zip.folder(code);
        if (productFolder) {
          const ipsFolder = productFolder.folder("SELLO DE AGUA IPS");
          const rtgFolder = productFolder.folder("SELLO DE AGUA RTG");

          for (const image of groupedImages[code]) {
            const originalFilename = image.filename.split(".").slice(0, -1).join(".");

            // Apply IPS watermark
            const ipsWatermarkedDataUrl = await applyWatermarkToImage(image.dataUrl, ipsWatermark);
            if (ipsWatermarkedDataUrl) {
              const ipsBlob = await (await fetch(ipsWatermarkedDataUrl)).blob();
              ipsFolder?.file(`${originalFilename}-IPS.png`, ipsBlob);
            }

            // Apply RTG watermark
            const rtgWatermarkedDataUrl = await applyWatermarkToImage(image.dataUrl, rtgWatermark);
            if (rtgWatermarkedDataUrl) {
              const rtgBlob = await (await fetch(rtgWatermarkedDataUrl)).blob();
              rtgFolder?.file(`${originalFilename}-RTG.png`, rtgBlob);
            }
          }
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "imagenes_con_marca_de_agua.zip");
    } catch (error) {
      console.error("Error al generar el ZIP:", error);
      // Optionally show a toast notification for error
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gray-50 text-gray-900">
      <Card className="w-full max-w-6xl shadow-lg rounded-xl overflow-hidden border border-gray-200 bg-white">
        <CardHeader className="bg-blue-600 text-white p-8 text-center">
          <CardTitle className="text-4xl font-bold tracking-tight">
            Herramienta de Marca de Agua por Lotes
          </CardTitle>
          <p className="text-lg opacity-90 mt-2">
            Carga tus imágenes, las agruparemos y aplicaremos marcas de agua automáticamente.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-8 p-8">
          <ImageUploader onImagesSelected={handleImagesSelected} />

          {Object.keys(groupedImages).length > 0 && (
            <div className="w-full space-y-10">
              <h2 className="text-3xl font-bold text-center text-gray-800">
                Imágenes Agrupadas
              </h2>
              {Object.entries(groupedImages).map(([code, images]) => (
                <div key={code} className="border border-gray-200 p-6 rounded-lg shadow-sm bg-gray-50">
                  <h3 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center gap-3 text-blue-700">
                    Código: <Badge variant="outline" className="text-lg px-4 py-1.5 bg-blue-100 text-blue-700 border-blue-300">{code}</Badge>
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
              <div className="flex justify-center mt-8 space-x-4"> {/* Added space-x-4 for spacing */}
                <Button
                  onClick={handleDownloadAll}
                  disabled={isDownloading}
                  className="px-8 py-4 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                >
                  {isDownloading ? "Preparando descarga..." : "Descargar Todo"}
                  <Download className="h-5 w-5" />
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline" // Using outline variant for a secondary action
                  className="px-8 py-4 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  Reiniciar
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
          {selectedImages.length === 0 && (
            <p className="text-xl text-gray-500 text-center p-10 border-2 border-dashed border-gray-300 rounded-xl w-full max-w-xl bg-gray-100">
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