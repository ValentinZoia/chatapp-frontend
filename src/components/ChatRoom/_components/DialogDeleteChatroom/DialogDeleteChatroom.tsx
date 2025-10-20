import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useChatroomMutations } from "@/data/Chatrooms/useChatroomsMutations";
import { useUserStore } from "@/stores/userStore";
import { useNavigate } from "react-router-dom";
interface DeleteItemDialogProps {
  open: boolean;
  onClose: () => void;
  chatroomId: number;
}

function DialogDeleteChatroom({
  open,
  onClose,
  chatroomId,
}: DeleteItemDialogProps) {
  const userId = useUserStore((state) => state.id);
  const navigate = useNavigate();
  const {
    deleteChatroom,
    deleteChatroomLoading: isLoading,
    deleteChatroomError,
  } = useChatroomMutations(userId);

  if (deleteChatroomError) {
    console.log(deleteChatroomError);
  }

  const onDelete = async () => {
    try {
      await deleteChatroom({ chatroomId });
      onClose();
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Sala?</DialogTitle>
          <DialogDescription>
            Estas Seguro que deseas eliminar esta Sala? Esta accion no se puede
            deshacer.
            {deleteChatroomError && (
              <p className="text-red-500">
                Ocurrio un error al intentar eliminar la sala
              </p>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between gap-4">
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              disabled={isLoading}
              aria-label="Cancelar"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            aria-label="Eliminar"
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DialogDeleteChatroom;
