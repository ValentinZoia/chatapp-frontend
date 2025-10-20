import { useSuspenseQuery } from "@apollo/client/react";
import { GET_USERS_AND_CHATROOM_INFO } from "@/graphql/queries";
import type {
  GetUsersOfChatroomQuery,
  GetUsersOfChatroomQueryVariables,
} from "@/gql/graphql";

export function useGetUsersAndChatroomInfo(chatroomId: number) {
  return useSuspenseQuery<
    GetUsersOfChatroomQuery,
    GetUsersOfChatroomQueryVariables
  >(GET_USERS_AND_CHATROOM_INFO, {
    variables: { chatroomId },
    skip: !chatroomId, // evita ejecutar si no hay chatroomId
  });
}
