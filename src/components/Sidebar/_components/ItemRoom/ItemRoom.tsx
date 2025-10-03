import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import type { GetChatroomsForUserQuery } from "@/gql/graphql";
import { Link, useLocation } from "react-router-dom";

function ItemRoom({
  room,
}: {
  room: GetChatroomsForUserQuery["getChatroomsForUser"][number];
}) {
  const location = useLocation();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={location.pathname === `/room/${room.id}`}
      >
        <Link to={`/room/${room.id}`}>
          <div className={`h-2 w-2 rounded-full`} />
          <span>{room.name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
export default ItemRoom;
