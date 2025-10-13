import { gql } from "@apollo/client";

export const GET_MESSAGES_FOR_CHATROOM = gql`
  query GetMessagesForChatroom($chatroomId: Float!, $take: Int!, $cursor: Int) {
    getMessagesForChatroom(
      chatroomId: $chatroomId
      take: $take
      cursor: $cursor
    ) {
      id
      content
      imageUrl
      createdAt
      user {
        id
        fullname
        avatarUrl
      }
      # chatroom {
      #   id
      #   name
      #   users {
      #     id
      #     fullname
      #     avatarUrl
      #   }
      # }
    }
  }
`;
