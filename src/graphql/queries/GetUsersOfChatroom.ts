import { gql } from "@apollo/client";

export const GET_USERS_AND_CHATROOM_INFO = gql`
  query GetUsersOfChatroom($chatroomId: Float!) {
    getUsersOfChatroom(chatroomId: $chatroomId) {
      id
      fullname
      email
      avatarUrl
    }
    getChatroomById(chatroomId: $chatroomId) {
      id
      name
      adminId
      users {
        id
        fullname
        avatarUrl
      }
    }
  }
`;
