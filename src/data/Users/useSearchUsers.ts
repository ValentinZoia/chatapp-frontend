// import { useSuspenseQuery } from "@apollo/client/react";
import { SEARCH_USERS } from "@/graphql/queries";
import type {
  SearchUsersQuery,
  SearchUsersQueryVariables,
} from "@/gql/graphql";
import { useQuery } from "@apollo/client/react";

export function useSearchUsers(fullname: string) {
  return useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SEARCH_USERS, {
    variables: { fullname },
    // skip: !fullname, // evita ejecutar si no hay userId
  });
}
