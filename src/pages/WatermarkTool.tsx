"use client";

import React, { useState, useMemo } from "react";
import UploadDialog from "@/components/UploadDialog";
import Sidebar from "@/components/Sidebar";
import OriginalImageCard from "@/components/OriginalImageCard";
import ImagePreviewDialog from "@/components/ImagePreviewDialog";
import CanvasEditorView from "@/components/CanvasEditorView";
import { Card, CardContent } from "@/components/ui/card";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { applyWatermarkToImage } from "@/utils/watermarkUtils";
import { generateProductCanvasImage } from "@/utils/imageProcessingUtils";
import { toast } from "sonner";

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
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(true);
  const [isImagePreviewDialogOpen, setIsImagePreviewDialogOpen] = useState(false);
  const [imageToPreview, setImageToPreview] = useState<ImageFile | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [currentRightPanel, setCurrentRightPanel] = useState<'previews' | 'canvasEditor'>('previews');

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

  const displayedImages = useMemo(() => {
    if (selectedGroup === null) {
      return selectedImages;
    }
    return groupedImages[selectedGroup] || [];
  }, [selectedImages, groupedImages, selectedGroup]);

  const handleViewImage = (image: ImageFile) => {
    setImageToPreview(image);
    setIsImagePreviewDialogOpen(true);
  };

  const handleImagesSelected = (newImages: ImageFile[]) => {
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleConfirmUpload = () => {
    if (selectedImages.length > 0) {
      setIsUploadDialogOpen(false);
      setCurrentRightPanel('previews'); // Ensure we show previews after upload
    } else {
      toast.error("Por favor, carga al menos una imagen para continuar.");
    }
  };

  const handleReset = () => {
    setSelectedImages([]);
    setImageToPreview(null);
    setIsUploadDialogOpen(true);
    setIsImagePreviewDialogOpen(false);
    setIsDownloading(false);
    setSelectedGroup(null);
    setCurrentRightPanel('previews'); // Reset to previews view
    toast.success("Aplicación reiniciada. ¡Carga nuevas imágenes!");
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
          const blueFolder = productFolder.folder("BLUE"); // New folder for canvas images

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

            // Generate product canvas image (CORTO) and add to "BLUE" folder
            const productCanvasDataUrl = await generateProductCanvasImage(image.dataUrl);
            if (productCanvasDataUrl) {
              const canvasBlob = await (await fetch(productCanvasDataUrl)).blob();
              blueFolder?.file(`${originalFilename}-Lienzo.png`, canvasBlob);
            }
          }
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "imagenes_procesadas.zip");
      toast.success("¡Todas las imágenes han sido procesadas y descargadas!");
    } catch (error) {
      console.error("Error al generar el ZIP:", error);
      toast.error("Error al descargar las imágenes. Inténtalo de nuevo.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground">
      {isUploadDialogOpen ? (
        <UploadDialog
          isOpen={isUploadDialogOpen}
          onClose={() => {
            if (selectedImages.length > 0) {
              setIsUploadDialogOpen(false);
              setCurrentRightPanel('previews'); // Go to previews if images are loaded
            } else {
              toast.info("Por favor, carga imágenes o cancela para salir.");
            }
          }}
          onImagesSelected={handleImagesSelected}
          onConfirm={handleConfirmUpload}
          hasImages={selectedImages.length > 0}
          selectedImages={selectedImages}
        />
      ) : (
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
            <Sidebar
              onReset={handleReset}
              onAddImages={() => setIsUploadDialogOpen(true)}
              onDownloadAll={handleDownloadAll}
              groupedImages={groupedImages}
              isDownloading={isDownloading}
              onSelectGroup={setSelectedGroup}
              selectedGroup={selectedGroup}
              onSelectRightPanel={setCurrentRightPanel}
              currentRightPanel={currentRightPanel}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>
            {currentRightPanel === 'previews' ? (
              <div className="h-full overflow-y-auto p-8 bg-white dark:bg-gray-950">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
                  Previsualización de Imágenes
                </h2>
                {displayedImages.length === 0 ? (
                  <p className="text-xl text-gray-500 dark:text-gray-400 text-center p-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl w-full max-w-xl mx-auto bg-gray-100 dark:bg-gray-800">
                    Carga imágenes para empezar a ver las previsualizaciones.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                    {displayedImages.map((image, index) => (
                      <OriginalImageCard
                        key={`${image.filename}-${index}`}
                        image={image}
                        onView={handleViewImage}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <CanvasEditorView images={selectedImages} />
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      )}

      {imageToPreview && (
        <ImagePreviewDialog
          isOpen={isImagePreviewDialogOpen}
          onClose={() => setIsImagePreviewDialogOpen(false)}
          originalImage={imageToPreview}
          watermarkImages={watermarkImages}
        />
      )}
    </div>
  );
};

export default WatermarkTool;