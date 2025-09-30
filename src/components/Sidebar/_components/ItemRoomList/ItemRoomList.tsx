import {
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { ItemRoom } from "../ItemRoom";

export interface IRoom {
  id: string;
  name: string;
  color: string;
  description?: string;
  members?: number;
  active?: number;
  image?: string;
}

function ItemRoomList({ rooms, title }: { rooms: IRoom[]; title: string }) {
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
