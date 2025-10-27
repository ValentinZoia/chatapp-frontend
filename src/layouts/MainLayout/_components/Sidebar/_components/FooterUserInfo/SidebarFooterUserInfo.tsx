import { SidebarFooter } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/userStore";
import { useGeneralStore } from "@/stores/generalStore";
import { LogOutButton } from "../LogOutButton";
import { EditProfileButton } from "../EditProfileButton";

function SidebarFooterUserInfo() {
  const username = useUserStore((state) => state.fullname);
  const avatarUrl = useUserStore((state) => state.avatarUrl);
  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);
  return (
    <SidebarFooter className="border-t border-sidebar-border">
      <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent p-3">
        {username ? (
          <>
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={avatarUrl || "/placeholder.svg"}
                alt={username}
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {username ? username.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex overflow-hidden">
              <div>
                <p className="truncate text-sm font-medium text-sidebar-accent-foreground">
                  {username || "Usuario"}
                </p>

                <p className="truncate text-xs text-muted-foreground">En línea</p>
              </div>
              <div className="w-full flex justify-end gap-4">
                <EditProfileButton />
                <LogOutButton />

              </div>
            </div>

          </>
        ) : (
          <div className="w-full flex justify-center">
            <p
              className="text-center cursor-pointer text-blue-600"
              onClick={toggleLoginModal}
            >
              Iniciar Sesión
            </p>
          </div>
        )}
      </div>
    </SidebarFooter>
  );
}
export default SidebarFooterUserInfo;
