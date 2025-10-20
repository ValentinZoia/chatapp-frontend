import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GeneralState {
  isProfileSettingsModalOpen: boolean;
  isLoginModalOpen: boolean;
  isDeleteChatroomDialogOpen: boolean;
  isAddUsersToChatroomDialogOpen: boolean;
  isCreateRoomModalOpen: boolean;
  toggleProfileSettingsModal: () => void;
  toggleDeleteChatroomDialog: () => void;
  toggleAddUsersToChatroomDialog: () => void;
  toggleLoginModal: () => void;
  toggleCreateRoomModal: () => void;
}

export const useGeneralStore = create<GeneralState>()(
  persist(
    (set) => ({
      isProfileSettingsModalOpen: false,
      isLoginModalOpen: false,
      isDeleteChatroomDialogOpen: false,
      isAddUsersToChatroomDialogOpen: false,
      isCreateRoomModalOpen: false,
      toggleProfileSettingsModal: () =>
        set((state) => ({
          isProfileSettingsModalOpen: !state.isProfileSettingsModalOpen,
        })),
      toggleLoginModal: () =>
        set((state) => ({
          isLoginModalOpen: !state.isLoginModalOpen,
        })),
      toggleDeleteChatroomDialog: () =>
        set((state) => ({
          isDeleteChatroomDialogOpen: !state.isDeleteChatroomDialogOpen,
        })),
      toggleAddUsersToChatroomDialog: () =>
        set((state) => ({
          isAddUsersToChatroomDialogOpen: !state.isAddUsersToChatroomDialogOpen,
        })),
      toggleCreateRoomModal: () =>
        set((state) => ({
          isCreateRoomModalOpen: !state.isCreateRoomModalOpen,
        })),
    }),
    {
      name: "general-storage",
    }
  )
);
