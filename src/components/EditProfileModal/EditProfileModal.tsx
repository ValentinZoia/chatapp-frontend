import { useGeneralStore } from "@/stores/generalStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { EditProfileForm } from "./_components";

function EditProfileModal() {
  const isEditProfileModalOpen = useGeneralStore(
    (state) => state.isProfileSettingsModalOpen
  );
  const toggleEditProfileModal = useGeneralStore(
    (state) => state.toggleProfileSettingsModal
  );

  return (
    <Dialog onOpenChange={toggleEditProfileModal} open={isEditProfileModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configuración de Perfil</DialogTitle>
          <DialogDescription>Edita tu perfil</DialogDescription>
        </DialogHeader>
        <EditProfileForm />
      </DialogContent>
    </Dialog>
  );
}
export default EditProfileModal;
