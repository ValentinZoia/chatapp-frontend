/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation Login($logInInput: LogInInput!) {\n    login(LogInInput: $logInInput) {\n      user {\n        id\n        email\n        fullname\n        avatarUrl\n      }\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": typeof types.LogoutDocument,
    "\n  mutation Register($registerInput: RegisterInput!) {\n    register(RegisterInput: $registerInput) {\n      user {\n        id\n        email\n        fullname\n        avatarUrl\n      }\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  mutation UpdateUserProfile($fullname: String!, $file: Upload) {\n    updateUserProfile(fullname: $fullname, file: $file) {\n      id\n      email\n      fullname\n      avatarUrl\n    }\n  }\n": typeof types.UpdateUserProfileDocument,
    "\n  query FindUserById($id: Int!) {\n    findUserById(id: $id) {\n      id\n      fullname\n      email\n    }\n  }\n": typeof types.FindUserByIdDocument,
    "\n  query Hello {\n    hello\n  }\n": typeof types.HelloDocument,
};
const documents: Documents = {
    "\n  mutation Login($logInInput: LogInInput!) {\n    login(LogInInput: $logInInput) {\n      user {\n        id\n        email\n        fullname\n        avatarUrl\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation Register($registerInput: RegisterInput!) {\n    register(RegisterInput: $registerInput) {\n      user {\n        id\n        email\n        fullname\n        avatarUrl\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation UpdateUserProfile($fullname: String!, $file: Upload) {\n    updateUserProfile(fullname: $fullname, file: $file) {\n      id\n      email\n      fullname\n      avatarUrl\n    }\n  }\n": types.UpdateUserProfileDocument,
    "\n  query FindUserById($id: Int!) {\n    findUserById(id: $id) {\n      id\n      fullname\n      email\n    }\n  }\n": types.FindUserByIdDocument,
    "\n  query Hello {\n    hello\n  }\n": types.HelloDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($logInInput: LogInInput!) {\n    login(LogInInput: $logInInput) {\n      user {\n        id\n        email\n        fullname\n        avatarUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($logInInput: LogInInput!) {\n    login(LogInInput: $logInInput) {\n      user {\n        id\n        email\n        fullname\n        avatarUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($registerInput: RegisterInput!) {\n    register(RegisterInput: $registerInput) {\n      user {\n        id\n        email\n        fullname\n        avatarUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($registerInput: RegisterInput!) {\n    register(RegisterInput: $registerInput) {\n      user {\n        id\n        email\n        fullname\n        avatarUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserProfile($fullname: String!, $file: Upload) {\n    updateUserProfile(fullname: $fullname, file: $file) {\n      id\n      email\n      fullname\n      avatarUrl\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserProfile($fullname: String!, $file: Upload) {\n    updateUserProfile(fullname: $fullname, file: $file) {\n      id\n      email\n      fullname\n      avatarUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindUserById($id: Int!) {\n    findUserById(id: $id) {\n      id\n      fullname\n      email\n    }\n  }\n"): (typeof documents)["\n  query FindUserById($id: Int!) {\n    findUserById(id: $id) {\n      id\n      fullname\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Hello {\n    hello\n  }\n"): (typeof documents)["\n  query Hello {\n    hello\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;