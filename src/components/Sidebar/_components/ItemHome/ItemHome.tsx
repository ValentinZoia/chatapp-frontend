import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function ItemHome() {
  const location = useLocation();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={location.pathname === "/"}>
        <Link to="/">
          <Home className="h-4 w-4" />
          <span>Inicio</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
export default ItemHome;
