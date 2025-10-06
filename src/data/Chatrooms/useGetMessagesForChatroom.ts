import { useSuspenseQuery } from "@apollo/client/react";
import { GET_MESSAGES_FOR_CHATROOM } from "@/graphql/queries";
import type {
  GetMessagesForChatroomQuery,
  GetMessagesForChatroomQueryVariables,
} from "@/gql/graphql";

export type IMessage = NonNullable<
  GetMessagesForChatroomQuery["getMessagesForChatroom"][0]
>;

export function useGetMessagesForChatroom(chatroomId: number) {
  return useSuspenseQuery<
    GetMessagesForChatroomQuery,
    GetMessagesForChatroomQueryVariables
  >(GET_MESSAGES_FOR_CHATROOM, {
    variables: { chatroomId },
    skip: chatroomId == null, // evita ejecutar si no hay categoryId
  });
}
