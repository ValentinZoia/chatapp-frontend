import { useSuspenseQuery } from "@apollo/client/react";
import { GET_USERS_OF_CHATROOM } from "@/graphql/queries";
import type {
  GetUsersOfChatroomQuery,
  GetUsersOfChatroomQueryVariables,
} from "@/gql/graphql";

export function useGetUsersOfChatroom(chatroomId: number) {
  return useSuspenseQuery<
    GetUsersOfChatroomQuery,
    GetUsersOfChatroomQueryVariables
  >(GET_USERS_OF_CHATROOM, {
    variables: { chatroomId },
    skip: !chatroomId, // evita ejecutar si no hay chatroomId
  });
}
