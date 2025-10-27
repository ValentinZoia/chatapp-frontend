import { clearAuthSession } from "@/apolloClient";
import { ItemForPopover } from "@/components/ChatRoom/_components/SettingsPopover/SettingsPopover";
import { useAuthMutations } from "@/data/Auth/useAuthMutations";

import { LogOut } from "lucide-react";

function LogOutButton() {
  const { logout, logoutLoading } = useAuthMutations();
  const handleLogout = async () => {
    await logout();
    clearAuthSession();
  };

  return (

    <ItemForPopover
      icon={<LogOut className="size-6 md:size-5 md:hover:text-red-500" />}
      text="Cerrar Sesión"
      disabledTextInDesktop={true}
      onClick={handleLogout}
      disabled={logoutLoading}
    />
  );
}
export default LogOutButton;
