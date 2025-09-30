import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import type { IRoom } from "../ItemRoomList/ItemRoomList";

function ItemRoom({ room }: { room: IRoom }) {
  const location = useLocation();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={location.pathname === `/room/${room.id}`}
      >
        <Link to={`/room/${room.id}`}>
          <div className={`h-2 w-2 rounded-full ${room.color}`} />
          <span>{room.name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
export default ItemRoom;
