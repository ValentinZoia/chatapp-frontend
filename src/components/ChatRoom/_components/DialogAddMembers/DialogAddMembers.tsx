import { AddMembersStep } from "@/components/CreateRoomModal/_components";
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
import { useAddUsersToRoom } from "@/hooks/useAddUsersToRoom";
import { UserPlus } from "lucide-react";

interface DialogAddMmebersProps {
  open: boolean;
  onClose: () => void;
  chatroomId: number;
}

function DialogAddMembers({
  open,
  onClose,
  chatroomId,
}: DialogAddMmebersProps) {
  const {
    selectedUsers,
    setSelectedUsers,
    searchResults,
    loading,
    handleSearchChange,
    handleAddUsers,
    resetSelection,
  } = useAddUsersToRoom();

  const onAddUsers = async () => {
    if (!chatroomId) return;

    try {
      await handleAddUsers(chatroomId);
      setTimeout(() => {
        onClose();
        resetSelection();
      }, 500);
    } catch (error) {
      console.error("Error adding users:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Miembros</DialogTitle>
          <DialogDescription>
            Busca y agrega miembros a la sala.
            {/* {deleteChatroomError && (
              <p className="text-red-500">
                Ocurrio un error al intentar eliminar la sala
              </p>
            )} */}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <AddMembersStep
            searchResults={searchResults}
            selectedUsers={selectedUsers}
            onSearchChange={handleSearchChange}
            onSelectUser={setSelectedUsers}
            loading={loading}
          />
        </div>

        <DialogFooter className="flex justify-between gap-4">
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              disabled={loading}
              aria-label="Cancelar"
              onClick={resetSelection}
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            variant="default"
            onClick={onAddUsers}
            aria-label="Agregar"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {loading ? "Agregando..." : "Agregar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DialogAddMembers;
