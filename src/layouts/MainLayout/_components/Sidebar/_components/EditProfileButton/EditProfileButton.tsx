import { ItemForPopover } from "@/components/ChatRoom/_components/SettingsPopover/SettingsPopover";
import { useGeneralStore } from "@/stores/generalStore";
import { UserPen } from "lucide-react";

function EditProfileButton() {
  const toggleLoginModal = useGeneralStore(
    (state) => state.toggleProfileSettingsModal
  );

  return (
    <ItemForPopover
      icon={<UserPen className="size-6 md:size-5" />}
      disabledTextInDesktop={true}
      text="Editar Perfil"
      onClick={toggleLoginModal}
    />
  );
}
export default EditProfileButton;
