import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

function LogOutButton() {
  const handleLogout = () => {
    // if (logout) {
    //   logout()
    // }
    console.log("logout");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 shrink-0"
      onClick={handleLogout}
      title="Cerrar sesión"
    >
      <LogOut className="h-4 w-4" />
    </Button>
  );
}
export default LogOutButton;
