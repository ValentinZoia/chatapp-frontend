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
  UserRooms,
} from "@/components/Sidebar/_components";

import { Suspense } from "react";
import type { GetChatroomsForUserQuery } from "@/gql/graphql";

const MAIN_ROOMS: GetChatroomsForUserQuery["getChatroomsForUser"] = [
  { id: 0, name: "General" },
  { id: 1, name: "Boca Juniors" },
  { id: 2, name: "River Plate" },
  { id: 3, name: "Racing Club" },
  { id: 4, name: "Independiente" },
  { id: 5, name: "San Lorenzo" },
];

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

        {/* Mis Salas (User Created Rooms) - Suspense */}

        <Suspense fallback={<SidebarSeparator />}>
          <UserRooms />
        </Suspense>

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
