"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react"; // Icon for "VER" button

interface OriginalImageCardProps {
  image: { dataUrl: string; filename: string };
  onView: (image: { dataUrl: string; filename: string }) => void;
}

const OriginalImageCard: React.FC<OriginalImageCardProps> = ({ image, onView }) => {
  return (
    <Card className="flex flex-col items-center space-y-3 p-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800 w-full max-w-[300px]">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center break-all">
        {image.filename}
      </p>
      <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden w-full aspect-square flex items-center justify-center">
        <img
          src={image.dataUrl}
          alt={image.filename}
          className="max-w-full max-h-full object-contain"
          style={{ maxWidth: "300px", maxHeight: "300px" }}
        />
      </div>
      <Button onClick={() => onView(image)} className="w-full flex items-center justify-center gap-2">
        <Eye className="h-4 w-4" /> Ver Previsualización
      </Button>
    </Card>
  );
};

export default OriginalImageCard;