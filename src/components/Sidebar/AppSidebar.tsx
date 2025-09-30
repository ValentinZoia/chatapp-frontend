import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import {
  ButtonCreateRoom,
  ItemHome,
  ItemRoomList,
  HomeSidebarHeader,
  SidebarFooterUserInfo,
} from "@/components/Sidebar/_components";

import type { IRoom } from "@/components/Sidebar/_components/ItemRoomList/ItemRoomList";

const MAIN_ROOMS: IRoom[] = [
  { id: "general", name: "General", color: "bg-chart-1" },
  { id: "boca", name: "Boca Juniors", color: "bg-blue-600" },
  { id: "river", name: "River Plate", color: "bg-red-600" },
  { id: "racing", name: "Racing Club", color: "bg-sky-500" },
  { id: "independiente", name: "Independiente", color: "bg-red-700" },
  { id: "san-lorenzo", name: "San Lorenzo", color: "bg-blue-800" },
];
const userRooms: { id: string; name: string; color: string }[] = [];

export function AppSidebar() {
  return (
    <Sidebar>
      <HomeSidebarHeader />

      <SidebarContent>
        {/* Home */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <ItemHome />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Salas Principales */}
        <SidebarGroup>
          <ItemRoomList rooms={MAIN_ROOMS} title="Salas Principales" />
        </SidebarGroup>

        {/* Mis Salas (User Created Rooms) */}
        {userRooms.length > 0 && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <ItemRoomList rooms={userRooms} title="Mis Salas" />
            </SidebarGroup>
          </>
        )}

        {/* Create Room Button */}
        <SidebarGroup>
          <SidebarGroupContent>
            <ButtonCreateRoom />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooterUserInfo />
    </Sidebar>
  );
}
