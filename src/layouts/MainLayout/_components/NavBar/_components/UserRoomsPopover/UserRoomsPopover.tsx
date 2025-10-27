import { Suspense, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader, MessagesSquare } from "lucide-react";

import { UserRooms } from "../../../Sidebar/_components";
import { useUserStore } from "@/stores/userStore";

function UserRoomsPopover() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isAuth = useUserStore((state) => state.isAuthenticated);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild disabled={!isAuth} className={`${!isAuth ? "pointer-events-none opacity-50" : ""} `}>
        <button className="w-fit md:w-full flex flex-col md:flex-row items-center md:justify-start cursor-pointer md:gap-3 md:border-1 md:p-1 md:rounded-md md:border-dashed bg-transparent hover:text-foreground transition-colors"  >
          <MessagesSquare className="h-6 w-6" aria-hidden="true" />
          <span className="text-xs mt-1">Mis Salas</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-4">
        <Suspense fallback={<Loader className="mr-2 h-4 w-4 animate-spin" />}>
          <UserRooms />
        </Suspense>
      </PopoverContent>



    </Popover>
  )
}

export default UserRoomsPopover
