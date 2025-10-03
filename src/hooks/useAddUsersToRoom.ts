import { useChatroomMutations } from "@/data/Chatrooms/useChatroomsMutations";
import { useSearchUsers } from "@/data/Users/useSearchUsers";
import type { UserEntity } from "@/gql/graphql";
import { useRef, useState } from "react";

export function useAddUsersToRoom() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>(null);

  const { data: usersFetched, refetch } = useSearchUsers(searchTerm);

  const { addUsersToChatroom, addUsersToChatroomLoading: loading } =
    useChatroomMutations();

  const handleSearchChange = (term: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setSearchTerm(term);
      if (term) {
        refetch({ fullname: term });
      }
    }, 300);
  };

  const handleAddUsers = async (chatroomId: number) => {
    if (!chatroomId || selectedUsers.length === 0) return;

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

  const searchResults =
    usersFetched?.searchUsers?.map((user: UserEntity) => ({
      label: user.fullname,
      value: String(user.id),
    })) || [];

  return {
    searchTerm,
    selectedUsers,
    setSelectedUsers,
    searchResults,
    loading,
    handleSearchChange,
    handleAddUsers,
    resetSelection,
  };
}
