import { useSuspenseQuery } from "@apollo/client/react";
import { FIND_USER_BY_ID } from "@/graphql/queries";
import type {
  FindUserByIdQuery,
  FindUserByIdQueryVariables,
} from "@/gql/graphql";

export function useFindUserById(id: number) {
  return useSuspenseQuery<FindUserByIdQuery, FindUserByIdQueryVariables>(
    FIND_USER_BY_ID,
    {
      variables: { id },
      skip: !id, // evita ejecutar si no hay userId
    }
  );
}
