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
    <div className="flex flex-col h-full bg-gray-950 border-r border-gray-800 p-4 text-white"> {/* Fondo oscuro y texto blanco */}
      <div className="flex flex-col gap-3 mb-6">
        <Button onClick={onReset} variant="outline" className="w-full flex items-center justify-center gap-2 text-gray-200 hover:bg-gray-800 border-gray-700">
          <RotateCcw className="h-4 w-4 text-primary" /> Reiniciar
        </Button>
        <Button onClick={onAddImages} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Añadir Imágenes
        </Button>
        <Button
          onClick={onDownloadAll}
          disabled={isDownloading || !hasImages}
          className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white hover:bg-gray-600"
        >
          {isDownloading ? "Preparando descarga..." : "Descargar Todo"}
          <Download className="h-4 w-4 text-primary" />
        </Button>
      </div>

      <Separator className="my-4 bg-gray-700" /> {/* Separador oscuro */}

      {/* Apartado para cambiar entre vistas del panel derecho */}
      <div className="mb-6 flex flex-col gap-3">
        <Button
          onClick={() => onSelectRightPanel('previews')}
          variant={currentRightPanel === 'previews' ? "secondary" : "ghost"}
          className={cn(
            "w-full flex items-center justify-center gap-2",
            currentRightPanel === 'previews' ? "bg-gray-700 text-white hover:bg-gray-600" : "text-gray-300 hover:bg-gray-800"
          )}
          disabled={!hasImages}
        >
          <ImageIcon className="h-4 w-4 mr-2 text-primary" /> Previsualizar Imágenes
        </Button>
        <Button
          onClick={() => onSelectRightPanel('canvasEditor')}
          variant={currentRightPanel === 'canvasEditor' ? "secondary" : "ghost"}
          className={cn(
            "w-full flex items-center justify-center gap-2",
            currentRightPanel === 'canvasEditor' ? "bg-gray-700 text-white hover:bg-gray-600" : "text-gray-300 hover:bg-gray-800"
          )}
          disabled={!hasImages}
        >
          <LayoutDashboard className="h-4 w-4 mr-2 text-primary" /> Editor de Lienzos
        </Button>
      </div>

      <Separator className="my-4 bg-gray-700" /> {/* Separador oscuro */}

      <h3 className="text-lg font-semibold text-white mb-3">Imágenes Cargadas</h3> {/* Texto blanco */}
      {!hasImages ? (
        <p className="text-sm text-gray-400 text-center py-4">
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
                selectedGroup === null ? "bg-gray-700 text-white hover:bg-gray-600" : "text-gray-300 hover:bg-gray-800"
              )}
            >
              <ImageIcon className="h-4 w-4 mr-2 text-primary" /> Todas las Imágenes
            </Button>
            {Object.entries(groupedImages).map(([code, images]) => (
              <Button
                key={code}
                variant={selectedGroup === code ? "secondary" : "ghost"}
                onClick={() => onSelectGroup(code)}
                className={cn(
                  "w-full justify-start",
                  selectedGroup === code ? "bg-gray-700 text-white hover:bg-gray-600" : "text-gray-300 hover:bg-gray-800"
                )}
              >
                <ImageIcon className="h-4 w-4 mr-2 text-primary" /> {code} ({images.length})
              </Button>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Sidebar;