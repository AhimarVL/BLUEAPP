"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import { toast } from "react-hot-toast";

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (files: File[]) => void;
}

const UploadDialog: React.FC<UploadDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/tiff": [".tiff", ".tif"],
      "image/bmp": [".bmp"],
    },
  });

  const handleConfirm = () => {
    if (files.length > 0) {
      onConfirm(files);
      setFiles([]); // Limpiar archivos después de confirmar
      onClose();
    } else {
      toast.error("Por favor, selecciona al menos un archivo.");
    }
  };

  const handleClose = () => {
    setFiles([]); // Limpiar archivos al cerrar
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-lg pt-4 px-8 pb-8 bg-[#27292b] rounded-3xl shadow-lg flex flex-col max-h-[90vh] border-none" // Cambiado a rounded-3xl
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-3xl font-bold text-white">
            Cargar Archivos
          </DialogTitle>
        </DialogHeader>

        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center p-10 border-2 border-dashed ${
            isDragActive ? "border-purple-500" : "border-gray-600"
          } rounded-xl text-center cursor-pointer transition-colors duration-200 h-48`}
        >
          <input {...getInputProps()} />
          <CloudUpload className="h-16 w-16 text-purple-400 mb-4" />
          {isDragActive ? (
            <p className="text-lg text-purple-300">Suelta los archivos aquí...</p>
          ) : (
            <>
              <p className="text-lg text-gray-300">Arrastra y suelta tus archivos aquí</p>
              <p className="text-sm text-gray-400 mt-1">o haz click para buscar</p>
            </>
          )}
          {files.length > 0 && (
            <p className="mt-4 text-sm text-gray-200">
              Archivos seleccionados: {files.map((file) => file.name).join(", ")}
            </p>
          )}
        </div>

        <DialogFooter className="flex justify-end gap-4 mt-8">
          <Button
            variant="outline"
            onClick={handleClose}
            className="bg-gray-700 hover:bg-gray-600 text-white border-none px-6 py-3 rounded-lg"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;