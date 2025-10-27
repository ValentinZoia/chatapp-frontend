import { ButtonCreateRoom } from "@/layouts/MainLayout/_components/Sidebar/_components";

import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { UserProfilePopover } from "../UserProfilePopover";
import { UserRoomsPopover } from "../UserRoomsPopover";

export function IconItemMenuBar({ iconMobile: IconMobile, iconDesktop: IconDesktop, label, to, onClick, disabled = false }: { iconMobile: React.ComponentType<{ className?: string }>; iconDesktop?: React.ComponentType<{ className?: string }>; label: string; to?: string; onClick?: () => void, disabled?: boolean; }) {
  return (
    <Link
      to={to || ""}
      className={`${disabled ? "pointer-events-none" : ""}`}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
    >
      <button
        className={`w-fit md:w-full flex flex-col md:flex-row items-center md:justify-start cursor-pointer md:gap-3 md:border-1 md:p-1 md:rounded-md md:border-dashed bg-transparent hover:text-foreground transition-colors ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={onClick}
        disabled={disabled}
      >
        {IconDesktop && <IconDesktop className="hidden md:block h-4 w-4" />}
        <IconMobile className="block md:hidden h-6 w-6" aria-hidden="true" />
        <span className="text-xs md:text-sm mt-1 md:mt-0">{label}</span>

      </button>
    </Link>
  );
}


export default function MenuBar() {
  return (

    <div className="sticky bottom-0 z-40 flex w-full justify-center items-center gap-12 border-t border-muted bg-background text-blue-500  py-6 md:hidden">

      {/* Inicio */}
      <IconItemMenuBar iconMobile={Home} label="Inicio" to="/" />

      {/* Crear sala */}
      <ButtonCreateRoom />

      {/* Mis salas */}
      <UserRoomsPopover />

      {/* Perfil de usuario */}
      <UserProfilePopover />

    </div>


  );
}
