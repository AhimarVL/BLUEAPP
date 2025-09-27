import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-4">
      <div className="text-center p-10 bg-white rounded-xl shadow-lg border border-gray-200 max-w-lg w-full">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">
          Bienvenido
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          ¡Tu herramienta de marca de agua te espera!
        </p>
        <Link to="/watermark-tool">
          <Button className="px-8 py-4 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            Ir a la Herramienta
          </Button>
        </Link>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;