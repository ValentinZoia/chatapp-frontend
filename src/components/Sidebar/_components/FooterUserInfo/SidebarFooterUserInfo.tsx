import { SidebarFooter } from "@/components/ui/sidebar";
import { LogOutButton } from "../LogOutButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/userStore";

function SidebarFooterUserInfo() {
  const username = useUserStore((state) => state.fullname);

  return (
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
        <LogOutButton />
      </div>
    </SidebarFooter>
  );
}
export default SidebarFooterUserInfo;
