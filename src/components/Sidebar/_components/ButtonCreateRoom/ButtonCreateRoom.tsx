import { useGeneralStore } from "@/stores/generalStore";
import { Plus, CirclePlus } from "lucide-react";

function ButtonCreateRoom() {
  const toggleCreateRoomModal = useGeneralStore(
    (state) => state.toggleCreateRoomModal
  );
  const handleCreateRoom = () => {
    if (toggleCreateRoomModal) {
      toggleCreateRoomModal();
    }
  };

  return (

    <button onClick={handleCreateRoom} className="w-fit md:w-full flex flex-col md:flex-row items-center md:justify-start cursor-pointer md:gap-3 md:border-1 md:p-1 md:rounded-md md:border-dashed bg-transparent hover:text-foreground transition-colors">
      <Plus className="hidden md:block h-4 w-4" />

      <CirclePlus className="block md:hidden h-6 w-6" aria-hidden="true" />

      <span className="text-xs md:text-sm mt-1 md:mt-0">Crear Sala</span>
    </button>
  );
}
export default ButtonCreateRoom;
