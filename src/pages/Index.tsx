import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-gray-100 p-4">
      <div className="text-center p-8 bg-card rounded-xl shadow-2xl border border-primary/20 max-w-lg w-full animate-fade-in">
        <h1 className="text-5xl font-extrabold mb-4 text-primary-foreground tracking-tight">
          Bienvenido a tu Aplicación
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          ¡Empieza a construir tu increíble proyecto aquí!
        </p>
        <Link to="/watermark-tool">
          <Button className="px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            Ir a la Herramienta de Marca de Agua
          </Button>
        </Link>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;