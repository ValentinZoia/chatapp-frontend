import { useGeneralStore } from "@/stores/generalStore";
import { Plus, CirclePlus } from "lucide-react";
import { IconItemMenuBar } from "../../../NavBar/_components/MenuBar/MenuBar";
import { useUserStore } from "@/stores/userStore";

function ButtonCreateRoom() {
  const toggleCreateRoomModal = useGeneralStore(
    (state) => state.toggleCreateRoomModal
  );

  const isAuth = useUserStore((state) => state.isAuthenticated);


  const handleCreateRoom = () => {
    if (toggleCreateRoomModal) {
      toggleCreateRoomModal();
    }
  };

  return (


    <IconItemMenuBar
      iconMobile={CirclePlus}
      iconDesktop={Plus}
      label="Crear Sala"
      onClick={handleCreateRoom}
      disabled={!isAuth}

    />
  );
}
export default ButtonCreateRoom;
