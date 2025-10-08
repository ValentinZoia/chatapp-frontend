import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" {...props}>
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
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={"Crear Sala"}>
                  <ButtonCreateRoom />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooterUserInfo />
    </Sidebar>
  );
}
