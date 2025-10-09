import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Settings, Trash, UserRoundPlus } from "lucide-react";

import { useGeneralStore } from "@/stores/generalStore";

const SETTINGS_ITEMS = [
  { id: 1, icon: <UserRoundPlus />, text: "Agregar Usuarios" },
  { id: 2, icon: <Trash />, text: "Eliminar Sala" },
];

function Item({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}) {
  return (
    <div
      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <span className="text-sm">{text}</span>
    </div>
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
              <Item
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
