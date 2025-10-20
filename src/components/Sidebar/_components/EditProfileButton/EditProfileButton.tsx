import { Button } from "@/components/ui/button";
import { useGeneralStore } from "@/stores/generalStore";
import { UserPen } from "lucide-react";

function EditProfileButton() {
  const toggleLoginModal = useGeneralStore(
    (state) => state.toggleProfileSettingsModal
  );

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 shrink-0 cursor-pointer"
      onClick={toggleLoginModal}
      title="Editar Perfil"
    >
      <UserPen className="h-4 w-4 cursor-pointer" />
    </Button>
  );
}
export default EditProfileButton;
