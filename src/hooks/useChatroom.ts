import { useChatroomMutations } from "@/data/Chatrooms/useChatroomsMutations";
import {
  useGetMessagesForChatroom,
  type IMessage,
} from "@/data/Chatrooms/useGetMessagesForChatroom";
import { useLiveUsersSubscriptions } from "@/data/Chatrooms/useLiveUsersSubscriptions";
import { useMessagesSubscriptions } from "@/data/Chatrooms/useMessagesSubscriptions";
import { useGetUsersOfChatroom } from "@/data/Users/useGetUsersOfChatroom";
import type {
  // GetMessagesForChatroomQuery,
  // NewMessageSubscription,
  UserEntity,
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

  const { data: messagesData } = useGetMessagesForChatroom(chatroomId);

  const { data: usersData } = useGetUsersOfChatroom(chatroomId);

  const { liveUsersData, liveUsersLoading } =
    useLiveUsersSubscriptions(chatroomId);

  const { newMessageData } = useMessagesSubscriptions({ chatroomId });

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
    if (usersData?.getUsersOfChatroom) {
      setIsUserPartOfChatroom(
        usersData.getUsersOfChatroom.some((user) => user.id === userId)
      );
    }
  }, [usersData, userId]);

  return {
    chatroomId,
    userId,
    messages,
    users: usersData?.getUsersOfChatroom || [],
    liveUsers,
    liveUsersLoading,
    isUserPartOfChatroom,
  };
}
