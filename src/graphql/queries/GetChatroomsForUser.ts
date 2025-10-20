import { gql } from "@apollo/client";

export const GET_CHATROOMS_FOR_USER = gql`
  query GetChatroomsForUser($userId: Float!) {
    getChatroomsForUser(userId: $userId) {
      id
      name
      colorHex
      image
      description
      # Solo el último mensaje
      messages {
        id
        content
        createdAt
        user {
          id
          fullname
        }
      }
      # Usuarios totales
      users {
        id
      }
    }
  }
`;
