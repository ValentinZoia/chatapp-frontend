import { clearAuthSession } from "@/apolloClient";
import { Button } from "@/components/ui/button";
import { useAuthMutations } from "@/data/Auth/useAuthMutations";

import { LoaderCircle, LogOut } from "lucide-react";

function LogOutButton() {
  const { logout, logoutLoading } = useAuthMutations();
  const handleLogout = async () => {
    await logout();
    clearAuthSession();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 shrink-0 cursor-pointer"
      onClick={handleLogout}
      title="Cerrar sesión"
      disabled={logoutLoading}
    >
      {logoutLoading ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
    </Button>
  );
}
export default LogOutButton;
