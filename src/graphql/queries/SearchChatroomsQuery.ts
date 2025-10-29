import { gql } from "@apollo/client";

export const SEARCH_CHATROOMS_QUERY = gql`
  query GetChatroomsForSearch($searchTerm: String!, $limit: Int!) {
    getChatroomsForSearch(searchTerm: $searchTerm, limit: $limit) {
      chatrooms {
        id
        name
        colorHex
        image
        description
        access
        createdAt
      }
      totalCount
    }
  }
`;
