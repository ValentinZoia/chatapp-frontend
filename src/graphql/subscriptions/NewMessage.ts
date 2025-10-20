import { gql } from "@apollo/client";

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription NewMessage($chatroomId: Int!) {
    newMessage(chatroomId: $chatroomId) {
      node {
        id
        content
        imageUrl
        # createdAt
        user {
          id
          fullname
          avatarUrl
        }
      }
      cursor
    }
  }
`;
