import { gql } from "@apollo/client";

// import { graphql } from "@/gql";

//V1
export const FIND_USER_BY_ID = gql`
  query FindUserById($id: Int!) {
    findUserById(id: $id) {
      id
      fullname
      email
    }
  }
`;

//V2
// export const GET_USER_BY_ID_V2 = graphql(/* GraphQL */ `
//   query FindUserById($id: Int!) {
//     findUserById(id: $id) {
//       id
//       fullname
//       email
//     }
//   }
// `);
