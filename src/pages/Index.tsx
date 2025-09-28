import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#4e4e4e] text-white p-4">
      <div className="text-center p-10 bg-[#1f1f1f] rounded-xl shadow-lg border border-gray-700 max-w-lg w-full">
        <h1 className="text-5xl font-bold mb-4 text-white">
          Bienvenido
        </h1>
        <p className="text-xl text-gray-200 mb-8">
          ¡Tu herramienta de marca de agua te espera!
        </p>
        <Link to="/watermark-tool">
          <Button className="px-8 py-4 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            Ir a la Herramienta
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;