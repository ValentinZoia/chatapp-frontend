
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User2 } from "lucide-react";
import { EditProfileButton, LogOutButton } from "../../../Sidebar/_components";
import { useUserStore } from "@/stores/userStore";
import { LoginButton } from "@/components/LogInButton";

function UserProfilePopover() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isAuth = useUserStore((state) => state.isAuthenticated);
  const userEmail = useUserStore((state) => state.email);

  if (!isAuth) {
    return (
      <LoginButton />
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="cursor-pointer flex flex-col items-center  hover:text-foreground transition-colors" aria-label="Perfil de usuario">
          <User2 className="h-6 w-6" aria-hidden="true" />
          <span className="text-xs mt-1">Mi Perfil</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-4">
        <div className="space-y-1">
          <h4 className="font-medium text-sm text-muted-foreground mb-2 px-2">{userEmail}</h4>
          <div className="max-h-48 overflow-y-auto">

            <EditProfileButton />
            <LogOutButton />
          </div>
        </div>
      </PopoverContent>



    </Popover>
  )
}

export default UserProfilePopover
