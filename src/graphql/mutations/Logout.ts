import { gql } from "@apollo/client";
// import { graphql } from "@/gql";

// V1
export const LOGOUT_USER = gql`
  mutation Logout {
    logout
  }
`;

// V2
// export const LOGOUT_USER_V2 = graphql(/* GraphQL */ `
//   mutation Logout {
//     logout
//   }
// `);
