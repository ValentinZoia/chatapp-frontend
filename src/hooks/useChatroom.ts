import { useChatroomMutations } from "@/data/Chatrooms/useChatroomsMutations";
import {
  useGetMessagesForChatroom,
  type IMessage,
} from "@/data/Chatrooms/useGetMessagesForChatroom";
import { useLiveUsersSubscriptions } from "@/data/Chatrooms/useLiveUsersSubscriptions";
import { useMessagesSubscriptions } from "@/data/Chatrooms/useMessagesSubscriptions";
import { useGetUsersAndChatroomInfo } from "@/data/Users/useGetUsersOfChatroom";
import {
  ChatroomAccess,
  // GetMessagesForChatroomQuery,
  // NewMessageSubscription,
  type UserEntity,
} from "@/gql/graphql";

import { useUserStore } from "@/stores/userStore";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function useChatroom() {
  const { roomId } = useParams<{ roomId: string }>();
  if (!roomId) {
    throw new Response("Invalid room ID", { status: 400 });
  }
  const chatroomId = parseInt(roomId!);
  const userId = useUserStore((state) => state.id);

  //Traer los mensajes de la chatroom
  const { data: messagesData } = useGetMessagesForChatroom(chatroomId);

  // Traer los usuarios de la chatroom
  const { data: chatroomInfo } = useGetUsersAndChatroomInfo(chatroomId);

  // Traer los usuarios en vivo
  const { liveUsersData, liveUsersLoading } =
    useLiveUsersSubscriptions(chatroomId);

  const { newMessageData } = useMessagesSubscriptions({
    chatroomId,
  });

  const { enterChatroom, leaveChatroom } = useChatroomMutations();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [liveUsers, setLiveUsers] = useState<UserEntity[]>([]);
  const [isUserPartOfChatroom, setIsUserPartOfChatroom] = useState(false);

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

  // Update messages
  useEffect(() => {
    if (messagesData?.getMessagesForChatroom) {
      // if (messagesData.getMessagesForChatroom[0].chatroom) {
      //   console.log(messagesData.getMessagesForChatroom[0].chatroom);
      //   setInfoChatroom(messagesData.getMessagesForChatroom[0].chatroom);
      // }
      const uniqueMessages = Array.from(
        new Set(messagesData.getMessagesForChatroom.map((m) => m.id))
      )
        .map((id) =>
          messagesData.getMessagesForChatroom.find((m) => m.id === id)
        )
        .filter((m): m is IMessage => m !== undefined && m !== null);
      setMessages(uniqueMessages);
    }
  }, [messagesData]);

  // Handle new messages from subscription
  useEffect(() => {
    if (newMessageData?.newMessage) {
      setMessages((prev) => {
        if (
          newMessageData.newMessage &&
          !prev.find((m) => m?.id === newMessageData.newMessage?.id)
        ) {
          return [...prev, newMessageData.newMessage as IMessage].filter(
            (m): m is IMessage => m !== undefined && m !== null
          );
        }
        return prev.filter((m): m is IMessage => m !== undefined && m !== null);
      });
    }
  }, [newMessageData]);

  // Update live users
  useEffect(() => {
    if (liveUsersData?.liveUsersInChatroom) {
      setLiveUsers(liveUsersData.liveUsersInChatroom);
    }
  }, [liveUsersData]);

  // Check if user is part of chatroom
  useEffect(() => {
    if (chatroomInfo?.getUsersOfChatroom) {
      setIsUserPartOfChatroom(
        chatroomInfo.getChatroomById.access === ChatroomAccess.Public
          ? true
          : chatroomInfo.getUsersOfChatroom.some((user) => user.id === userId)
      );
    }
  }, [chatroomInfo, userId]);

  return {
    infoChatroom: chatroomInfo?.getChatroomById,
    chatroomId,
    userId,
    messages,
    users: chatroomInfo?.getUsersOfChatroom || [],
    liveUsers,
    liveUsersLoading,
    isUserPartOfChatroom,
  };
}
