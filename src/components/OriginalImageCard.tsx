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
    <Card className="flex flex-col items-center space-y-4 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white border border-gray-200 rounded-lg w-full max-w-[300px]">
      <p className="text-base font-medium text-gray-800 text-center break-all px-1">
        {image.filename}
      </p>
      <div className="border border-gray-200 rounded-md overflow-hidden w-full aspect-square flex items-center justify-center bg-gray-100">
        <img
          src={image.dataUrl}
          alt={image.filename}
          className="max-w-full max-h-full object-contain p-1"
        />
      </div>
      <Button onClick={() => onView(image)} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
        <Eye className="h-4 w-4" /> Ver Previsualización
      </Button>
    </Card>
  );
};

export default OriginalImageCard;