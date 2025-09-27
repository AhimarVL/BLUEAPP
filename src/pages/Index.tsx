import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 to-black text-gray-100 p-4">
      <div className="text-center p-10 bg-card rounded-2xl shadow-2xl border border-primary/30 max-w-lg w-full animate-fade-in relative overflow-hidden">
        {/* Fondo con efecto de brillo sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-30 animate-pulse-slow"></div>
        <h1 className="text-6xl font-extrabold mb-4 text-primary tracking-tight drop-shadow-lg relative z-10">
          Bienvenido
        </h1>
        <p className="text-xl text-muted-foreground mb-8 relative z-10">
          ¡Tu herramienta de marca de agua te espera!
        </p>
        <Link to="/watermark-tool">
          <Button className="px-10 py-5 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 relative z-10">
            Ir a la Herramienta
          </Button>
        </Link>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;