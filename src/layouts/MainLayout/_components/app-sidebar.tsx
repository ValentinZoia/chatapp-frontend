"use client";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, Plus, LogOut, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/userStore";
import { useGeneralStore } from "@/stores/generalStore";

const MAIN_ROOMS = [
  { id: "general", name: "General", color: "bg-chart-1" },
  { id: "boca", name: "Boca Juniors", color: "bg-blue-600" },
  { id: "river", name: "River Plate", color: "bg-red-600" },
  { id: "racing", name: "Racing Club", color: "bg-sky-500" },
  { id: "independiente", name: "Independiente", color: "bg-red-700" },
  { id: "san-lorenzo", name: "San Lorenzo", color: "bg-blue-800" },
];

export function AppSidebar() {
  const location = useLocation();
  const username = useUserStore((state) => state.fullname);
  //   const logout = useUserStore((state) => state.logout)
  const toggleCreateRoomModal = useGeneralStore(
    (state) => state.toggleCreateRoomModal
  );

  // Placeholder para rooms creadas por el usuario
  const userRooms: { id: string; name: string; color: string }[] = [];

  const handleLogout = () => {
    // if (logout) {
    //   logout()
    // }
    console.log("logout");
  };

  const handleCreateRoom = () => {
    if (toggleCreateRoomModal) {
      toggleCreateRoomModal();
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <MessageSquare className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-none text-sidebar-foreground">
              Fútbol Chat
            </h1>
            <p className="text-xs text-muted-foreground">Argentina</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Home */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/"}>
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    <span>Inicio</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Salas Principales */}
        <SidebarGroup>
          <SidebarGroupLabel>Salas Principales</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN_ROOMS.map((room) => (
                <SidebarMenuItem key={room.id}>
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
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Mis Salas (User Created Rooms) */}
        {userRooms.length > 0 && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Mis Salas</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {userRooms.map((room) => (
                    <SidebarMenuItem key={room.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === `/room/${room.id}`}
                      >
                        <Link to={`/room/${room.id}`}>
                          <MessageSquare className="h-4 w-4" />
                          <span>{room.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {/* Create Room Button */}
        <SidebarGroup>
          <SidebarGroupContent>
            <Button
              onClick={handleCreateRoom}
              variant="outline"
              className="w-full justify-start gap-3 border-dashed bg-transparent"
            >
              <Plus className="h-4 w-4" />
              <span>Crear Sala</span>
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent p-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {username ? username.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-sidebar-accent-foreground">
              {username || "Usuario"}
            </p>
            <p className="truncate text-xs text-muted-foreground">En línea</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={handleLogout}
            title="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
