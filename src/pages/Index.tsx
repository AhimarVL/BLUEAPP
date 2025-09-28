"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import UploadDialog from "@/components/UploadDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ImageFile {
  dataUrl: string;
  filename: string;
}

function Index() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);

  // Estados para el radio de los bordes
  const [mainDivBorderRadius, setMainDivBorderRadius] = useState<number>(12); // rounded-xl
  const [dialogBorderRadius, setDialogBorderRadius] = useState<number>(24); // rounded-3xl
  const [uploaderBorderRadius, setUploaderBorderRadius] = useState<number>(24); // rounded-3xl

  const [tempMainDivBorderRadius, setTempMainDivBorderRadius] = useState<number>(mainDivBorderRadius);
  const [tempDialogBorderRadius, setTempDialogBorderRadius] = useState<number>(dialogBorderRadius);
  const [tempUploaderBorderRadius, setTempUploaderBorderRadius] = useState<number>(uploaderBorderRadius);

  const [selectedComponent, setSelectedComponent] = useState<string>("mainDiv");

  const handleImagesSelected = (images: ImageFile[]) => {
    setSelectedImages(images);
  };

  const handleConfirmUpload = () => {
    console.log("Imágenes confirmadas:", selectedImages);
    setIsUploadDialogOpen(false);
    // Aquí podrías añadir lógica para procesar las imágenes
  };

  const handleApplySettings = () => {
    setMainDivBorderRadius(tempMainDivBorderRadius);
    setDialogBorderRadius(tempDialogBorderRadius);
    setUploaderBorderRadius(tempUploaderBorderRadius);
    alert("Ajustes de bordes aplicados y guardados para esta sesión.");
  };

  const getCurrentBorderRadius = () => {
    switch (selectedComponent) {
      case "mainDiv":
        return tempMainDivBorderRadius;
      case "uploadDialog":
        return tempDialogBorderRadius;
      case "imageUploader":
        return tempUploaderBorderRadius;
      default:
        return 0;
    }
  };

  const setCurrentBorderRadius = (value: number[]) => {
    const val = value[0];
    switch (selectedComponent) {
      case "mainDiv":
        setTempMainDivBorderRadius(val);
        break;
      case "uploadDialog":
        setTempDialogBorderRadius(val);
        break;
      case "imageUploader":
        setTempUploaderBorderRadius(val);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#4e4e4e] text-white p-4">
      <div
        className={cn(
          "text-center p-10 bg-[#1f1f1f] shadow-lg border border-gray-700 max-w-lg w-full",
          `rounded-[${mainDivBorderRadius}px]`
        )}
      >
        <h1 className="text-5xl font-bold mb-8 text-white">Bienvenido</h1>
        <p className="text-lg text-gray-300 mb-8">
          Haz clic en el botón para cargar tus imágenes.
        </p>
        <Button
          onClick={() => setIsUploadDialogOpen(true)}
          className="px-8 py-4 text-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Abrir Cargador de Imágenes
        </Button>
      </div>

      {/* Controles de ajuste de bordes */}
      <div className="mt-8 p-6 bg-[#1f1f1f] rounded-xl shadow-lg border border-gray-700 max-w-lg w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white mb-2">Ajustes de Bordes</h2>
        
        <div>
          <Label htmlFor="component-select" className="text-gray-300 mb-2 block">Seleccionar Componente:</Label>
          <Select value={selectedComponent} onValueChange={setSelectedComponent}>
            <SelectTrigger id="component-select" className="w-full bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Selecciona un componente" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600 text-white">
              <SelectItem value="mainDiv">Contenedor Principal</SelectItem>
              <SelectItem value="uploadDialog">Diálogo de Carga</SelectItem>
              <SelectItem value="imageUploader">Cargador de Imágenes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="border-radius-slider" className="text-gray-300 mb-2 block">Radio del Borde (px): {getCurrentBorderRadius()}px</Label>
          <Slider
            id="border-radius-slider"
            min={0}
            max={50}
            step={1}
            value={[getCurrentBorderRadius()]}
            onValueChange={setCurrentBorderRadius}
            className="w-full"
          />
        </div>

        <Button onClick={handleApplySettings} className="px-6 py-3 text-base bg-green-600 hover:bg-green-700 text-white">
          Aplicar y Guardar Ajustes
        </Button>
      </div>

      <UploadDialog
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onImagesSelected={handleImagesSelected}
        onConfirm={handleConfirmUpload}
        hasImages={selectedImages.length > 0}
        selectedImages={selectedImages}
        dialogBorderRadius={dialogBorderRadius}
        uploaderBorderRadius={uploaderBorderRadius}
      />
    </div>
  );
}

export default Index;