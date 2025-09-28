"use client";

import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string; // Para el div que envuelve el trigger
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={cn("relative flex items-center justify-center", containerClassName)}>
          <img src={src} alt={alt} className={cn("object-contain", className)} />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto p-1 bg-card border border-primary shadow-lg z-50"> {/* Cambiado border-border a border-primary */}
        <img src={src} alt={`Zoomed ${alt}`} className="w-[600px] h-[400px] object-contain" /> {/* Aumentado el tamaño del zoom */}
      </HoverCardContent>
    </HoverCard>
  );
};

export default ZoomableImage;