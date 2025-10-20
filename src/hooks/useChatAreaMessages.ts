import {
  useGetMessagesForChatroom,
  type IMessage,
} from "@/data/Chatrooms/useGetMessagesForChatroom";
import { useMessagesSubscriptions } from "@/data/Chatrooms/useMessagesSubscriptions";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function useChatAreaMessages() {
  const { roomId } = useParams<{ roomId: string }>();
  if (!roomId) {
    throw new Response("Invalid room ID", { status: 400 });
  }

  const chatroomId = parseInt(roomId!);
  const [messages, setMessages] = useState<IMessage[]>([]);
  // const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const {
    data: messagesData,
    error: messagesError,
    loading: messagesLoading,
    fetchMore,
  } = useGetMessagesForChatroom(chatroomId);

  const { newMessageData, newMessageError } = useMessagesSubscriptions({
    chatroomId,
  });
  if (newMessageError) {
    console.error("Subscription error:", newMessageError);
  }
  if (messagesError) {
    console.error("Messages query error:", messagesError);
  }

  // Update messages
  useEffect(() => {
    if (messagesData?.getMessagesForChatroom) {
      const edges = messagesData.getMessagesForChatroom.edges;
      const pageInfo = messagesData.getMessagesForChatroom.pageInfo;

      const uniqueMessages = Array.from(new Set(edges.map((m) => m.node.id)))
        .map((id) => edges.find((m) => m.node.id === id))
        .filter((m): m is IMessage => m !== undefined && m !== null);

      setMessages(uniqueMessages);
      setHasMore(pageInfo.hasNextPage);
      // setCursor(pageInfo.endCursor || null);
    }
  }, [messagesData, setMessages, setHasMore]);

  // Handle new messages from subscription
  useEffect(() => {
    if (newMessageData?.newMessage) {
      setMessages((prev) => {
        if (
          newMessageData.newMessage &&
          !prev.find((m) => m?.node.id === newMessageData.newMessage?.node.id)
        ) {
          return [...prev, newMessageData.newMessage].filter(
            (m): m is IMessage => m !== undefined && m !== null
          );
        }
        return prev.filter((m): m is IMessage => m !== undefined && m !== null);
      });
    }
  }, [newMessageData]);

  const loadMoreMessages = useCallback(async () => {
    if (!hasMore || !fetchMore || messagesLoading) return;
    console.log("Loading more messages...");
    const oldestMessageId = messages[0]?.node.id;
    console.log(
      "oldestMessageId:",
      oldestMessageId + messages[0]?.node.content
    );
    if (!oldestMessageId) return;

    try {
      const result = await fetchMore({
        variables: {
          chatroomId,
          cursor: oldestMessageId,
          take: 15,
        },
      });

      if (result?.data?.getMessagesForChatroom) {
        const newMessages = result.data.getMessagesForChatroom.edges;
        const pageInfo = result.data.getMessagesForChatroom.pageInfo;
        console.log("Fetched New page messages:", newMessages);
        setMessages((prev) => {
          // Evitar duplicados
          const existingIds = new Set(prev.map((m) => m.node.id));
          const uniqueNewMessages = newMessages.filter(
            (m) => !existingIds.has(m.node.id)
          );
          console.log("Unique New Messages:", uniqueNewMessages);
          console.log("NUEVO ARRAY COMPLETO", [...uniqueNewMessages, ...prev]);
          return [...uniqueNewMessages, ...prev];
        });

        setHasMore(pageInfo.hasNextPage);
      }
    } catch (error) {
      console.error("Error loading more messages:", error);
    }
  }, [messages, hasMore, fetchMore, chatroomId, messagesLoading]);

  return { messages, loadMoreMessages, hasMore, messagesLoading };
}
