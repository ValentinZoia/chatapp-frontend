import { ButtonCreateRoom } from "@/components/Sidebar/_components";

import { Home, MessagesSquare, User2 } from "lucide-react";
import { Link } from "react-router-dom";



export default function MenuBar() {
  return (

    <div className="sticky bottom-0 z-40 flex w-full justify-center items-center gap-12 border-t border-muted bg-background text-blue-500  py-6 md:hidden">

      {/* Inicio */}
      <Link to="/" className="flex flex-col items-center  hover:text-foreground transition-colors">
        <Home className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs mt-1">Inicio</span>
      </Link>

      {/* Crear sala */}





      <ButtonCreateRoom />


      {/* Mis salas */}
      <Link to="/mis-salas" className="flex flex-col items-center  hover:text-foreground transition-colors">
        <MessagesSquare className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs mt-1">Mis Salas</span>
      </Link>

      {/* Perfil de usuario */}
      {/* <ButtonUserProfile /> */}
      <Link to="/" className="flex flex-col items-center  hover:text-foreground transition-colors" aria-label="Perfil de usuario">
        <User2 className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs mt-1">Mi Perfil</span>
      </Link>
    </div>


  );
}
