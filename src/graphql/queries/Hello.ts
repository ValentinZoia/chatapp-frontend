import { gql } from "@apollo/client";
// import { graphql } from "@/gql";

// V1
export const GET_HELLO = gql`
  query Hello {
    hello
  }
`;

// V2
// export const GET_HELLO_V2 = graphql(/* GraphQL */ `
//   query Hello {
//     hello
//   }
// `);
