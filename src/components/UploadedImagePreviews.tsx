"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ImageFile {
  dataUrl: string;
  filename: string;
}

interface GroupedImages {
  [code: string]: ImageFile[];
}

interface UploadedImagePreviewsProps {
  images: ImageFile[];
}

const UploadedImagePreviews: React.FC<UploadedImagePreviewsProps> = ({ images }) => {
  const groupedImages = useMemo(() => {
    const groups: GroupedImages = {};
    images.forEach((image) => {
      const match = image.filename.match(/^([a-zA-Z0-9_]+)(-\d+)?\.\w+$/);
      const code = match ? match[1] : "Sin Código";

      if (!groups[code]) {
        groups[code] = [];
      }
      groups[code].push(image);
    });
    return groups;
  }, [images]);

  if (images.length === 0) {
    return null; // No renderizar si no hay imágenes
  }

  return (
    <div className="mt-8 max-h-[400px]"> {/* Altura máxima para el scroll */}
      <h3 className="text-xl font-bold text-foreground mb-4 text-center">Imágenes Cargadas</h3>
      <ScrollArea className="h-full w-full pr-4">
        <div className="flex flex-col gap-6">
          {Object.entries(groupedImages).map(([code, group]) => (
            <Card key={code} className="bg-card border border-border shadow-sm">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-lg font-semibold text-foreground">{code}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {group.map((image, index) => (
                  <div
                    key={`${image.filename}-${index}`}
                    className="relative w-20 h-20 rounded-md overflow-hidden border border-muted flex items-center justify-center bg-background"
                  >
                    <img
                      src={image.dataUrl}
                      alt={image.filename}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default UploadedImagePreviews;