import { Button } from "@/components/ui/button";
import { useGeneralStore } from "@/stores/generalStore";
import { Plus } from "lucide-react";

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
    <Button
      onClick={handleCreateRoom}
      variant="outline"
      className="w-full justify-start gap-3 border-dashed bg-transparent"
    >
      <Plus className="h-4 w-4" />
      <span>Crear Sala</span>
    </Button>
  );
}
export default ButtonCreateRoom;
