import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { LoaderCircle, Settings, Trash, UserRoundPlus } from "lucide-react";

import { useGeneralStore } from "@/stores/generalStore";
import { cn } from "@/lib/utils";

const SETTINGS_ITEMS = [
  { id: 1, icon: <UserRoundPlus />, text: "Agregar Usuarios" },
  { id: 2, icon: <Trash />, text: "Eliminar Sala" },
];

export function ItemForPopover({
  icon,
  text,
  disabledTextInDesktop = false,
  onClick,
  disabled = false,
}: {
  icon: React.ReactNode;
  text?: string;
  disabledTextInDesktop?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={cn(
        "w-full  flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer",
        disabledTextInDesktop ? "md:w-fit md:p-0" : "",
      )}
      onClick={onClick}
      type="button"
    >
      {disabled ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {icon}

        </>
      )}
      {
        text && <span className={cn(
          "text-sm",
          disabledTextInDesktop ? "md:hidden" : ""
        )}>{text}</span>
      }

    </button>
  );
}

function SettingsPopover({ chatroomId }: { chatroomId?: number }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toogleDeleteChatroomDialog = useGeneralStore(
    (state) => state.toggleDeleteChatroomDialog
  );
  const toogleAddMembersDialog = useGeneralStore(
    (state) => state.toggleAddUsersToChatroomDialog
  );
  const handleItemClick = (text: string) => {
    if (text === "Eliminar Sala") {
      toogleDeleteChatroomDialog();
    } else if (text === "Agregar Usuarios") {
      toogleAddMembersDialog();
    }
  };
  if (!chatroomId) {
    console.log("no hay");

    return null;
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Settings className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent
        className="w-64 p-2"
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
      >
        <div className="space-y-1">
          <h4 className="font-medium text-sm mb-2 px-2">
            Configuración de Sala
          </h4>
          <div className="max-h-64 overflow-y-auto">
            {SETTINGS_ITEMS.map((item) => (
              <ItemForPopover
                key={item.id}
                icon={item.icon}
                text={item.text}
                onClick={() => handleItemClick(item.text)}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
export default SettingsPopover;
