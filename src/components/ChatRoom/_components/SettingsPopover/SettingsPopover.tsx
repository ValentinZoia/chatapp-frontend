import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Settings, Trash, UserRoundPlus } from "lucide-react";

const SETTINGS_ITEMS = [
  { id: 1, icon: <UserRoundPlus />, text: "Agregar Usuarios" },
  { id: 2, icon: <Trash />, text: "Eliminar Sala" },
];

function SettingsPopover() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Settings className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent
        className="w-64 p-2"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="space-y-1">
          <h4 className="font-medium text-sm mb-2 px-2">
            Configuración de Sala
          </h4>
          <div className="max-h-64 overflow-y-auto">
            {SETTINGS_ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer"
              >
                {item.icon}
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
export default SettingsPopover;
