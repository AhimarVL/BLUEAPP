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
      <HoverCardContent className="w-auto p-1 bg-card border border-border shadow-lg z-50">
        <img src={src} alt={`Zoomed ${alt}`} className="w-[400px] h-[240px] object-contain" />
      </HoverCardContent>
    </HoverCard>
  );
};

export default ZoomableImage;