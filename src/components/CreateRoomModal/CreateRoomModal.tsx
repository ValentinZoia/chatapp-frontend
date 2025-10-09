import { useAddUsersToRoom } from "@/hooks/useAddUsersToRoom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useGeneralStore } from "@/stores/generalStore";
import { useCreateChatroom } from "@/hooks/useCreateChatroom";
import { useRoomCreationStepper } from "@/hooks/useRoomCreationStepper";
import { Button } from "../ui/button";
import { ChevronLeft, UserPlus } from "lucide-react";
import { AddMembersStep, CreateRoomForm } from "./_components";
import type { CreateChatroomFormData } from "@/lib/zod-schemas/createChatroomSchema";

function CreateRoomModal() {
  const isCreateRoomModalOpen = useGeneralStore(
    (state) => state.isCreateRoomModalOpen
  );
  const toggleCreateRoomModal = useGeneralStore(
    (state) => state.toggleCreateRoomModal
  );

  const { currentStep, goToNextStep, goToPreviousStep, resetStepper } =
    useRoomCreationStepper();

  const {
    form,
    loading: createLoading,
    newlyCreatedChatroom,
    handleCreateChatroom,
    resetChatroom,
  } = useCreateChatroom();

  const {
    selectedUsers,
    setSelectedUsers,
    searchResults,
    loading: addUsersLoading,
    handleSearchChange,
    handleAddUsers,
    resetSelection,
  } = useAddUsersToRoom();

  const handleClose = () => {
    toggleCreateRoomModal();
    resetStepper();
    resetChatroom();
    resetSelection();
  };

  const onCreateRoom = async (data: CreateChatroomFormData) => {
    try {
      await handleCreateChatroom(data);
      goToNextStep();
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const onAddUsers = async () => {
    if (!newlyCreatedChatroom?.id) return;

    try {
      await handleAddUsers(newlyCreatedChatroom.id);
      handleClose();
    } catch (error) {
      console.error("Error adding users:", error);
    }
  };

  const steps = [
    {
      title: "Create Chatroom",
      description: "Enter a name for your new chatroom",
    },
    {
      title: "Add Members",
      description: "Search and add members to your chatroom",
    },
  ];

  return (
    <Dialog open={isCreateRoomModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
          <DialogDescription>
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {currentStep === 0 && (
            <CreateRoomForm
              form={form}
              loading={createLoading}
              onSubmit={onCreateRoom}
            />
          )}

          {currentStep === 1 && (
            <AddMembersStep
              searchResults={searchResults}
              selectedUsers={selectedUsers}
              onSearchChange={handleSearchChange}
              onSelectUser={setSelectedUsers}
              loading={addUsersLoading}
            />
          )}
        </div>

        <DialogFooter className="flex justify-between">
          {currentStep > 0 && (
            <div className="flex gap-2 items-center ">
              <Button variant="outline" onClick={goToPreviousStep}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button variant="outline" onClick={handleClose}>
                Omitir
              </Button>
            </div>
          )}

          {currentStep === 1 && selectedUsers.length > 0 && (
            <Button onClick={onAddUsers} disabled={addUsersLoading}>
              <UserPlus className="h-4 w-4 mr-2" />
              {addUsersLoading ? "Adding..." : "Add Users"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default CreateRoomModal;
