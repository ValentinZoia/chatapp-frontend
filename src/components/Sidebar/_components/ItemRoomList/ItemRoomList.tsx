import {
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { ItemRoom } from "../ItemRoom";
import type { GetChatroomsForUserSideBarQuery } from "@/gql/graphql";

interface Props {
  rooms: GetChatroomsForUserSideBarQuery["getChatroomsForUser"];
  title: string;
}

function ItemRoomList({ rooms, title }: Props) {
  return (
    <>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {rooms.map((room) => (
            <ItemRoom key={room.id} room={room} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </>
  );
}
export default ItemRoomList;
