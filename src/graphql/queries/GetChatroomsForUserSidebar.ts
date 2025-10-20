import { gql } from "@apollo/client";

export const GET_CHATROOMS_FOR_USER_SIDEBAR = gql`
  query GetChatroomsForUserSideBar($userId: Float!) {
    getChatroomsForUser(userId: $userId) {
      id
      name
      colorHex
    }
  }
`;
