import { Home, User2 } from "lucide-react";
import { Link } from "react-router-dom";

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
  return (
    <>
      <div className={className}>
        <Link to="/" aria-label="Ir al inicio">
          <Home
            className="h-6 w-6"
            aria-hidden="true" // Atributo ARIA: mejora la accesibilidad
          />
        </Link>

        <Link to="/" aria-label="Ir al historial de partidos">
          <User2
            className="h-6 w-6"
            aria-hidden="true" // Atributo ARIA: mejora la accesibilidad
          />
        </Link>
      </div>
    </>
  );
}
