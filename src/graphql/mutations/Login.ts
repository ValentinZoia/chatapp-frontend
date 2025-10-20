import { gql } from "@apollo/client";
// import { graphql } from "@/gql";

//V1
export const LOGIN_USER = gql`
  mutation Login($logInInput: LogInInput!) {
    login(LogInInput: $logInInput) {
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
// export const LOGIN_USER_V2 = graphql(/* GraphQL */ `
//   mutation Login($logInInput: LogInInput!) {
//     login(LogInInput: $logInInput) {
//       user {
//         id
//         email
//         fullname
//         avatarUrl
//       }
//     }
//   }
// `);
