import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($input: LogInInput!) {
    login(input: $input) {
      user {
        id
        email
        fullname
        avatarUrl
      }
    }
  }
`;
