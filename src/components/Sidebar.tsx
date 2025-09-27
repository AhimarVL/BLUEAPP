"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Download, UploadCloud, Settings, Image as ImageIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  onReset: () => void;
  onDownload: () => void;
  onUpload: () => void;
  onSettings: () => void;
  onViewOriginals: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onReset,
  onDownload,
  onUpload,
  onSettings,
  onViewOriginals,
}) => {
  return (
    <div className="flex flex-col h-full bg-sidebar-background border-r border-sidebar-border p-4 text-sidebar-foreground">
      <div className="flex flex-col gap-3 mb-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onReset} variant="outline" className="w-full flex items-center justify-center gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground">
                <RotateCcw className="h-4 w-4" /> Reiniciar
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reiniciar todas las imágenes y configuraciones</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onDownload} className="w-full flex items-center justify-center gap-2 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90">
                <Download className="h-4 w-4" /> Descargar
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Descargar imágenes procesadas</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onUpload} variant="secondary" className="w-full flex items-center justify-center gap-2 bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80">
                <UploadCloud className="h-4 w-4" /> Cargar Nuevas
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cargar nuevas imágenes para procesar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Separator className="my-4 bg-sidebar-border" />

      <div className="flex flex-col gap-3 mt-auto"> {/* mt-auto para empujar al final */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onViewOriginals} variant="ghost" className="w-full flex items-center justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground">
                <ImageIcon className="h-4 w-4" /> Originales
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Ver imágenes originales</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onSettings} variant="ghost" className="w-full flex items-center justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground">
                <Settings className="h-4 w-4" /> Ajustes
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Configurar ajustes de la aplicación</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;