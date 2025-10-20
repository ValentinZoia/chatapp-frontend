import { gql } from "@apollo/client";
// import { graphql } from "@/gql";

//V1
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($fullname: String!, $file: Upload) {
    updateUserProfile(fullname: $fullname, file: $file) {
      id
      email
      fullname
      avatarUrl
    }
  }
`;

//V2
// export const UPDATE_USER_PROFILE_V2 = graphql(/* GraphQL */ `
//   mutation UpdateUserProfile($fullname: String!, $file: Upload) {
//     updateUserProfile(fullname: $fullname, file: $file) {
//       id
//       email
//       fullname
//       avatarUrl
//     }
//   }
// `);
