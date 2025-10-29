import { useEffect, useState } from "react";
import { ChatroomAccess, type UserEntity } from "@/gql/graphql";
import { useChatroomMutations } from "@/data/Chatrooms/useChatroomsMutations";
import { useGetUsersAndChatroomInfo } from "@/data/Users/useGetUsersOfChatroom";
import { useLiveUsersSubscriptions } from "@/data/Chatrooms/useLiveUsersSubscriptions";



//Este hook maneja toda la logica relacionada con una chatroom especifica, si informacion de la chatroom, usuarios en vivo, si el usuario es parte de la chatroom, etc.
export function useChatroom({
  userId,
  chatroomId,
}: {
  userId: number | undefined;
  chatroomId: number;
}) {
  if (userId === undefined) {
    throw new Error("User ID is required");
  }
  const [liveUsers, setLiveUsers] = useState<UserEntity[]>([]);
  const [isUserPartOfChatroom, setIsUserPartOfChatroom] = useState(false);

  // Traer los usuarios de la chatroom y la info (name, desc, etc).
  const { data: chatroomInfo } = useGetUsersAndChatroomInfo(chatroomId);

  // Traer los usuarios en vivo
  const { liveUsersData, liveUsersLoading } =
    useLiveUsersSubscriptions(chatroomId);

  const { enterChatroom, leaveChatroom } = useChatroomMutations(userId);

  // Handle enter/leave chatroom
  useEffect(() => {
    const handleEnter = async () => {
      try {
        await enterChatroom({ chatroomId });
      } catch (error) {
        console.error("Error entering chatroom:", error);
      }
    };

    const handleLeave = async () => {
      try {
        await leaveChatroom({ chatroomId });
      } catch (error) {
        console.error("Error leaving chatroom:", error);
      }
    };

    handleEnter();

    window.addEventListener("beforeunload", handleLeave);
    return () => {
      handleLeave();
      window.removeEventListener("beforeunload", handleLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatroomId]);

  // Update live users
  useEffect(() => {
    if (liveUsersData?.liveUsersInChatroom) {
      setLiveUsers(liveUsersData.liveUsersInChatroom);
    }
  }, [liveUsersData]);

  // Check if user is part of chatroom
  useEffect(() => {
    if (
      chatroomInfo?.getChatroomById &&
      userId !== undefined &&
      chatroomInfo?.getChatroomById.users
    ) {
      setIsUserPartOfChatroom(
        chatroomInfo.getChatroomById.access === ChatroomAccess.Public
          ? true
          : chatroomInfo.getChatroomById.users.some(
            (user) => user.id === userId
          )
      );
    }
  }, [chatroomInfo, userId]);

  return {
    infoChatroom: chatroomInfo?.getChatroomById, // Info of chatroom, nombre, desc,etc.
    liveUsers, //usuarios conectados en vivo
    liveUsersLoading, //loading de usuarios en vivo
    isUserPartOfChatroom, //si el usuario es parte de la chatroom
  };
}
