import { Suspense, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader, MessagesSquare } from "lucide-react";

import { UserRooms } from "../../../Sidebar/_components";

function UserRoomsPopover() {
  const [isOpen, setIsOpen] = useState<boolean>(false);


  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="cursor-pointer flex flex-col items-center  hover:text-foreground transition-colors" aria-label="Perfil de usuario">
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
