"use client";

import React, { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import WatermarkPreview from "@/components/WatermarkPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WatermarkTool: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState<string>("Dyad Watermark");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Herramienta de Marca de Agua</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <ImageUploader onImageSelected={setSelectedImage} />
          <WatermarkPreview
            imageSrc={selectedImage}
            watermarkText={watermarkText}
            onWatermarkTextChange={setWatermarkText}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default WatermarkTool;