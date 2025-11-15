import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="flex flex-col gap-4 h-screen w-full items-center justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg">
          <img
            src="/icon0.svg"
            alt="logo"
            className="aspect-auto object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Ops! Ocurrio un error
          </h2>
          <p className="mt-2 text-muted-foreground">
            La sala que buscás no existe o no estas autorizado para verla.
          </p>
          <Link to="/">
            <Button className="cursor-pointer mt-4 bg-blue-400 hover:bg-blue-400/80">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
