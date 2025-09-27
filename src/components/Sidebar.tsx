"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Download, RotateCcw, Image as ImageIcon, LayoutDashboard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ImageFile {
  dataUrl: string;
  filename: string;
}

interface GroupedImages {
  [code: string]: ImageFile[];
}

interface SidebarProps {
  onReset: () => void;
  onAddImages: () => void;
  onDownloadAll: () => void;
  groupedImages: GroupedImages;
  isDownloading: boolean;
  onSelectGroup: (code: string | null) => void;
  selectedGroup: string | null;
  onSelectRightPanel: (panel: 'previews' | 'canvasEditor') => void; // New prop for panel selection
  currentRightPanel: 'previews' | 'canvasEditor'; // New prop to indicate active panel
}

const Sidebar: React.FC<SidebarProps> = ({
  onReset,
  onAddImages,
  onDownloadAll,
  groupedImages,
  isDownloading,
  onSelectGroup,
  selectedGroup,
  onSelectRightPanel, // Destructure new prop
  currentRightPanel, // Destructure new prop
}) => {
  const hasImages = Object.keys(groupedImages).length > 0;

  return (
    <div className="flex flex-col h-full bg-card border-r border-border p-4">
      <div className="flex flex-col gap-3 mb-6">
        <Button onClick={onReset} variant="outline" className="w-full flex items-center justify-center gap-2 text-foreground hover:bg-muted">
          <RotateCcw className="h-4 w-4" /> Reiniciar
        </Button>
        <Button onClick={onAddImages} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Añadir Imágenes
        </Button>
        <Button
          onClick={onDownloadAll}
          disabled={isDownloading || !hasImages}
          className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          {isDownloading ? "Preparando descarga..." : "Descargar Todo"}
          <Download className="h-4 w-4" />
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Apartado para cambiar entre vistas del panel derecho */}
      <div className="mb-6 flex flex-col gap-3">
        <Button
          onClick={() => onSelectRightPanel('previews')}
          variant={currentRightPanel === 'previews' ? "secondary" : "ghost"}
          className={cn(
            "w-full flex items-center justify-center gap-2",
            currentRightPanel === 'previews' && "bg-muted text-foreground"
          )}
          disabled={!hasImages}
        >
          <ImageIcon className="h-4 w-4" /> Previsualizar Imágenes
        </Button>
        <Button
          onClick={() => onSelectRightPanel('canvasEditor')}
          variant={currentRightPanel === 'canvasEditor' ? "secondary" : "ghost"}
          className={cn(
            "w-full flex items-center justify-center gap-2",
            currentRightPanel === 'canvasEditor' && "bg-muted text-foreground"
          )}
          disabled={!hasImages}
        >
          <LayoutDashboard className="h-4 w-4" /> Editor de Lienzos
        </Button>
      </div>

      <Separator className="my-4" />

      <h3 className="text-lg font-semibold text-foreground mb-3">Imágenes Cargadas</h3>
      {!hasImages ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No hay imágenes cargadas.
        </p>
      ) : (
        <ScrollArea className="flex-1 pr-2">
          <div className="flex flex-col gap-2">
            <Button
              variant={selectedGroup === null ? "secondary" : "ghost"}
              onClick={() => onSelectGroup(null)}
              className={cn(
                "w-full justify-start",
                selectedGroup === null && "bg-muted text-foreground"
              )}
            >
              <ImageIcon className="h-4 w-4 mr-2" /> Todas las Imágenes
            </Button>
            {Object.entries(groupedImages).map(([code, images]) => (
              <Button
                key={code}
                variant={selectedGroup === code ? "secondary" : "ghost"}
                onClick={() => onSelectGroup(code)}
                className={cn(
                  "w-full justify-start",
                  selectedGroup === code && "bg-muted text-foreground"
                )}
              >
                <ImageIcon className="h-4 w-4 mr-2" /> {code} ({images.length})
              </Button>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Sidebar;