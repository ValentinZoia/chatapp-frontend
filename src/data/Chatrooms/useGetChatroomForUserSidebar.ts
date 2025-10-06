import { useSuspenseQuery } from "@apollo/client/react";
import { GET_CHATROOMS_FOR_USER_SIDEBAR } from "@/graphql/queries";
import type {
  GetChatroomsForUserSideBarQuery,
  GetChatroomsForUserSideBarQueryVariables,
} from "@/gql/graphql";

export function useGetChatroomsForUserSidebar(userId: number) {
  return useSuspenseQuery<
    GetChatroomsForUserSideBarQuery,
    GetChatroomsForUserSideBarQueryVariables
  >(GET_CHATROOMS_FOR_USER_SIDEBAR, {
    variables: { userId },
    skip: !userId, // evita ejecutar si no hay userId
  });
}
