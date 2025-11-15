import { gql } from "@apollo/client";
// import { graphql } from "@/gql";

// V1
export const REFRESH_TOKEN = gql`
  mutation refreshToken {
    refreshToken
  }
`;
