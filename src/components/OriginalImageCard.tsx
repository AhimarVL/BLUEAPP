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
    <Card className="flex flex-col items-center space-y-4 p-5 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border border-border rounded-lg w-full max-w-[300px] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-10"></div>
      <p className="text-base font-medium text-foreground text-center break-all px-2 relative z-10">
        {image.filename}
      </p>
      <div className="border border-border rounded-md overflow-hidden w-full aspect-square flex items-center justify-center bg-muted/20 relative z-10">
        <img
          src={image.dataUrl}
          alt={image.filename}
          className="max-w-full max-h-full object-contain p-1"
        />
      </div>
      <Button onClick={() => onView(image)} className="w-full flex items-center justify-center gap-2 text-primary-foreground bg-primary hover:bg-primary/90 relative z-10">
        <Eye className="h-4 w-4" /> Ver Previsualización
      </Button>
    </Card>
  );
};

export default OriginalImageCard;