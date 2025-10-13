import { useQuery } from "@apollo/client/react";
import { GET_MESSAGES_FOR_CHATROOM } from "@/graphql/queries";
import type {
  GetMessagesForChatroomQuery,
  GetMessagesForChatroomQueryVariables,
} from "@/gql/graphql";

export type IMessage = NonNullable<
  GetMessagesForChatroomQuery["getMessagesForChatroom"]["edges"][0]
>;

export function useGetMessagesForChatroom(
  chatroomId: number,
  cursor?: number | null
) {
  return useQuery<
    GetMessagesForChatroomQuery,
    GetMessagesForChatroomQueryVariables
  >(GET_MESSAGES_FOR_CHATROOM, {
    variables: { chatroomId, take: 15, cursor },
    skip: chatroomId == null, // evita ejecutar si no hay categoryId
  });
}
