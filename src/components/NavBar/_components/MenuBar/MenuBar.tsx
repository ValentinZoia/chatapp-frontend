import { Home, CirclePlus, MessagesSquare, User2 } from "lucide-react";
import { Link } from "react-router-dom";

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
  return (
    <>
      <div className={className}>

        {/* Inicio */}
        <Link to="/" className="flex flex-col items-center  hover:text-foreground transition-colors">
          <Home className="h-6 w-6" aria-hidden="true" />
          <span className="text-xs mt-1">Inicio</span>
        </Link>

        {/* Crear sala */}
        <Link to="/crear" className="flex flex-col items-center hover:text-foreground transition-colors">
          <CirclePlus className="h-6 w-6" aria-hidden="true" />
          <span className="text-xs mt-1">Nueva Sala</span>
        </Link>

        {/* Mis salas */}
        <Link to="/mis-salas" className="flex flex-col items-center  hover:text-foreground transition-colors">
          <MessagesSquare className="h-6 w-6" aria-hidden="true" />
          <span className="text-xs mt-1">Mis Salas</span>
        </Link>

        {/* Perfil de usuario */}
        <Link to="/" className="flex flex-col items-center  hover:text-foreground transition-colors" aria-label="Perfil de usuario">
          <User2 className="h-6 w-6" aria-hidden="true" />
          <span className="text-xs mt-1">Mi Perfil</span>
        </Link>
      </div>

    </>
  );
}
