import { gql } from "@apollo/client";
// import { graphql } from "@/gql";

//V1
export const REGISTER_USER = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(RegisterInput: $registerInput) {
      user {
        id
        email
        fullname
        avatarUrl
      }
    }
  }
`;

//V2
// export const REGISTER_USER_V2 = graphql(/* GraphQL */ `
//   mutation Register($registerInput: RegisterInput!) {
//     register(RegisterInput: $registerInput) {
//       user {
//         id
//         email
//         fullname
//         avatarUrl
//       }
//     }
//   }
// `);
