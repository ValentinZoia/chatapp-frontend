
import {
  useGetMessagesForChatroom,
  type IMessage,
} from "@/data/Chatrooms/useGetMessagesForChatroom";
import { NEW_MESSAGE_SUBSCRIPTION } from "@/graphql/subscriptions";
import type { NewMessageSubscription } from "@/gql/graphql";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

export function useChatAreaMessages() {
  const { roomId } = useParams<{ roomId: string }>();
  if (!roomId) {
    throw new Response("Invalid room ID", { status: 400 });
  }

  const chatroomId = parseInt(roomId!);
  const {
    data: messagesData,
    error: messagesError,
    loading: messagesLoading,
    fetchMore,
    subscribeToMore,
  } = useGetMessagesForChatroom(chatroomId);

  if (messagesError) {
    console.error("Messages query error:", messagesError);
  }

  // Suscribirse a nuevos mensajes
  useEffect(() => {
    if (!subscribeToMore) return;

    const unsubscribe = subscribeToMore<NewMessageSubscription>({
      document: NEW_MESSAGE_SUBSCRIPTION,
      variables: { chatroomId, take: 15 },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data?.newMessage) return prev;

        // Crear una copia profunda del mensaje y añadir createdAt con el formato correcto
        const newMessage: IMessage = {
          ...subscriptionData.data.newMessage,
          node: {
            ...subscriptionData.data.newMessage.node,
            createdAt: new Date().toISOString(), // Formato ISO para compatibilidad

          },

        };



        // Si no hay mensajes previos o no hay edges, inicializar
        if (!prev.getMessagesForChatroom?.edges) {
          return {
            getMessagesForChatroom: {
              edges: [newMessage],
              pageInfo: {
                hasNextPage: false,
                endCursor: newMessage.cursor
              },
              totalCount: 1
            }
          };
        }

        // Si el mensaje ya existe en el cache, no lo agregues
        const edges = prev.getMessagesForChatroom.edges;
        if (edges.some(msg => msg?.node?.id === newMessage.node.id)) {
          return prev;
        }

        // Agregar el nuevo mensaje al cache
        return {
          ...prev,
          getMessagesForChatroom: {
            ...prev.getMessagesForChatroom,
            edges: [...edges, newMessage],
            totalCount: (prev.getMessagesForChatroom.totalCount ?? 0) + 1,
          },
        };
      },
    });

    return () => unsubscribe();
  }, [chatroomId, subscribeToMore]);



  // eslint-disable-next-line react-hooks/exhaustive-deps
  const messages = messagesData?.getMessagesForChatroom?.edges ?? [];
  const hasMore = messagesData?.getMessagesForChatroom?.pageInfo?.hasNextPage ?? false;

  const loadMoreMessages = useCallback(async () => {
    if (!hasMore || !fetchMore || messagesLoading) return;
    const oldestMessageId = messages[0]?.node.id;
    if (!oldestMessageId) return;
    try {
      await fetchMore({
        variables: {
          chatroomId,
          cursor: oldestMessageId,
          take: 15,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const prevEdges = prev.getMessagesForChatroom?.edges ?? [];
          const newEdges = fetchMoreResult.getMessagesForChatroom?.edges ?? [];
          // Evitar duplicados
          const allEdges = [...newEdges, ...prevEdges];
          const uniqueEdges = Array.from(new Map(allEdges.map(m => [m.node.id, m])).values());
          return {
            ...fetchMoreResult,
            getMessagesForChatroom: {
              ...fetchMoreResult.getMessagesForChatroom,
              edges: uniqueEdges,
            },
          };
        },
      });
    } catch (error) {
      console.error("Error loading more messages:", error);
    }
  }, [hasMore, fetchMore, chatroomId, messages, messagesLoading]);



  return { messages, loadMoreMessages, hasMore, messagesLoading };
}
