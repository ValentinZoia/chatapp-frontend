import { useChatroomMutations } from "@/data/Chatrooms/useChatroomsMutations";
import type { UserEntity } from "@/gql/graphql";
import { useUserStore } from "@/stores/userStore";
import { useState } from "react";
import { useDebounce } from "./useDebounce";
import { useSearchUsers } from "@/data/Users/useSearchUsers";

export function useAddUsersToRoom() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  // const debounceTimeoutRef = useRef<NodeJS.Timeout>(null);
  const userId = useUserStore((state) => state.id);

  const { addUsersToChatroom, addUsersToChatroomLoading: loading } =
    useChatroomMutations(userId);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddUsers = async (chatroomId: number) => {
    if (!chatroomId || selectedUsers.length === 0) return;
    console.log("jajajajaaja");
    try {
      await addUsersToChatroom({
        chatroomId,
        userIds: selectedUsers.map((id) => parseInt(id)),
      });
      return true;
    } catch (error) {
      console.error("Error adding users:", error);
      throw error;
    }
  };

  const resetSelection = () => {
    setSelectedUsers([]);
    setSearchTerm("");
  };

  // Aquí deberías usar debouncedSearchTerm para la búsqueda de usuarios:
  const { data: usersFetched } = useSearchUsers(debouncedSearchTerm);
  const searchResults =
    usersFetched?.searchUsers?.map((user: UserEntity) => ({
      label: user.fullname,
      value: String(user.id),
    })) || [];

  return {
    searchTerm,
    debouncedSearchTerm,
    selectedUsers,
    setSelectedUsers,
    searchResults,
    loading,
    handleSearchChange,
    handleAddUsers,
    resetSelection,
  };
}
