"use client";

import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const SplashScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10; // Incrementa el progreso en 10%
        if (currentProgress > 100) {
          clearInterval(interval);
          navigate("/watermark-tool"); // Navega después de cargar
        } else {
          setProgress(currentProgress);
        }
      }, 200); // Actualiza cada 200ms para un total de 2 segundos (10 * 200ms = 2000ms)
      return () => clearInterval(interval);
    }, 500); // Inicia el progreso después de un pequeño retraso para mostrar el estado inicial

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1a] text-white p-4"> {/* Fondo oscuro consistente */}
      <div className="text-center p-10 bg-[#1f1f1f] rounded-xl shadow-lg border border-gray-700 max-w-lg w-full">
        <h1 className="text-5xl font-bold mb-8 text-white">
          Bienvenido
        </h1>
        <div className="w-full max-w-xs mx-auto">
          <Progress value={progress} className="w-full h-2 bg-gray-700" indicatorClassName="bg-primary" />
          <p className="text-sm text-gray-400 mt-2">Cargando...</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;