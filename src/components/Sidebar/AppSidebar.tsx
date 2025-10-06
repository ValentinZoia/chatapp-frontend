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
import { FEATURED_ROOMS } from "@/data/featured-rooms";

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
          <ItemRoomList rooms={FEATURED_ROOMS} title="Salas Principales" />
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
