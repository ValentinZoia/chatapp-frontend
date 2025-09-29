import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/graphql",
  documents: ["src/graphql/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;

/*
GraphQL Code Generator provides a unified way 
to get TypeScript types from GraphQL operations
*/
//Writing Graphql Queries
//npx graphql-codegen --watch --verbose
//npx graphql-codegen --config codegen.ts

//https://the-guild.dev/graphql/codegen/docs/guides/react-vue
