import { gql } from "@apollo/client";

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription NewMessage($chatroomId: Int!) {
    newMessage(chatroomId: $chatroomId) {
      id
      content
      imageUrl
      user {
        id
        fullname
        email
        avatarUrl
      }
    }
  }
`;
