"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface OriginalImageCardProps {
  image: { dataUrl: string; filename: string };
  onView: (image: { dataUrl: string; filename: string }) => void;
}

const OriginalImageCard: React.FC<OriginalImageCardProps> = ({ image, onView }) => {
  return (
    <Card className="flex flex-col items-center space-y-4 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-card border border-border rounded-lg w-full max-w-[300px]">
      {/* Se ha eliminado el nombre del archivo de aquí */}
      <div className="border border-border rounded-md overflow-hidden w-full aspect-square flex items-center justify-center bg-white dark:bg-gray-950">
        <img
          src={image.dataUrl}
          alt={image.filename}
          className="max-w-full max-h-full object-contain p-1"
        />
      </div>
      <Button onClick={() => onView(image)} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
        <Eye className="h-4 w-4" /> Previsualizar
      </Button>
    </Card>
  );
};

export default OriginalImageCard;