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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f2f0fe] text-foreground p-4"> {/* Fondo claro #f2f0fe y texto oscuro */}
      <div className="text-center p-10 bg-card rounded-xl shadow-lg border border-border max-w-lg w-full"> {/* Usar bg-card y border-border */}
        <h1 className="text-5xl font-bold mb-8 text-foreground"> {/* Texto oscuro */}
          Bienvenido
        </h1>
        <div className="w-full max-w-xs mx-auto">
          <Progress value={progress} className="w-full h-2 bg-muted" indicatorClassName="bg-primary" /> {/* Fondo de progreso muted */}
          <p className="text-sm text-muted-foreground mt-2">Cargando...</p> {/* Texto de carga muted-foreground */}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;