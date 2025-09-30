import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useGeneralStore } from "@/stores/generalStore";

function CreateRoomModal() {
  const isCreateRoomModalOpen = useGeneralStore(
    (state) => state.isCreateRoomModalOpen
  );
  const toggleCreateRoomModal = useGeneralStore(
    (state) => state.toggleCreateRoomModal
  );

  return (
    <Dialog onOpenChange={toggleCreateRoomModal} open={isCreateRoomModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Iniciar Sesión</DialogTitle>
          <DialogDescription>
            Ingresá a tu cuenta para acceder al chat
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-8">
          <div className="rounded-lg border border-dashed border-border bg-muted p-8 text-center">
            <p className="text-sm text-muted-foreground">
              El usuario implementará el formulario de rooms aquí
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Este es un placeholder para el diseño del modal
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default CreateRoomModal;
