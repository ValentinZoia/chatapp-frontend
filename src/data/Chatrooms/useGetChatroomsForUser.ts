import { useSuspenseQuery } from "@apollo/client/react";
import { GET_CHATROOMS_FOR_USER } from "@/graphql/queries";
import type {
  GetChatroomsForUserQuery,
  GetChatroomsForUserQueryVariables,
} from "@/gql/graphql";

export function useGetChatroomsForUser(userId: number) {
  return useSuspenseQuery<
    GetChatroomsForUserQuery,
    GetChatroomsForUserQueryVariables
  >(GET_CHATROOMS_FOR_USER, {
    variables: { userId },
    skip: !userId, // evita ejecutar si no hay userId
  });
}
