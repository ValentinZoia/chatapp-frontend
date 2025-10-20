import { gql } from "@apollo/client";

export const CREATE_CHATROOM = gql`
  mutation CreateChatroom($createChatroomInput: CreateChatroomInput!) {
    createChatroom(createChatroomInput: $createChatroomInput) {
      name
      id
    }
  }
`;
