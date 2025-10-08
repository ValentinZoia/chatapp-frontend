import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Settings, Trash, UserRoundPlus } from "lucide-react";
import { DialogDeleteChatroom } from "../DialogDeleteChatroom";

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
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  if (!chatroomId) {
    console.log("no hay");

    return null;
  }

  const handleItemClick = (text: string) => {
    setOpen((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

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
        {/* Ejemplo de uso del estado para cada ítem */}
        {open["Agregar Usuarios"] && (
          <div className="mt-2 text-xs text-primary">
            Modal para agregar usuarios abierto
          </div>
        )}
        {open["Eliminar Sala"] && (
          <>
            <DialogDeleteChatroom
              chatroomId={chatroomId}
              open
              onClose={() => handleItemClick("Eliminar Sala")}
            />
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
export default SettingsPopover;
