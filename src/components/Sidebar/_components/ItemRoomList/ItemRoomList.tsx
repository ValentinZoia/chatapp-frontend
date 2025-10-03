import {
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { ItemRoom } from "../ItemRoom";
import type { GetChatroomsForUserQuery } from "@/gql/graphql";

interface Props {
  rooms: GetChatroomsForUserQuery["getChatroomsForUser"];
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
