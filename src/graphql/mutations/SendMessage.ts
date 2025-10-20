import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation SendMessage($chatroomId: Float!, $content: String!, $image: Upload) {
    sendMessage(chatroomId: $chatroomId, content: $content, image: $image) {
      node {
        id
        content
        imageUrl
        createdAt
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
