import { useSuspenseQuery } from "@apollo/client/react";
import { SEARCH_USERS } from "@/graphql/queries";
import type {
  SearchUsersQuery,
  SearchUsersQueryVariables,
} from "@/gql/graphql";

export function useSearchUsers(fullname: string) {
  return useSuspenseQuery<SearchUsersQuery, SearchUsersQueryVariables>(
    SEARCH_USERS,
    {
      variables: { fullname },
      skip: !fullname, // evita ejecutar si no hay userId
    }
  );
}
