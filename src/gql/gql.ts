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
    "\n  mutation AddUsersToChatroom($chatroomId: Float!, $userIds: [Float!]!) {\n    addUsersToChatroom(chatroomId: $chatroomId, userIds: $userIds)\n  }\n": typeof types.AddUsersToChatroomDocument,
    "\n  mutation CreateChatroom($createChatroomInput: CreateChatroomInput!) {\n    createChatroom(createChatroomInput: $createChatroomInput) {\n      name\n      id\n    }\n  }\n": typeof types.CreateChatroomDocument,
    "\n  mutation DeleteChatroom($chatroomId: Float!) {\n    deleteChatroom(chatroomId: $chatroomId)\n  }\n": typeof types.DeleteChatroomDocument,
    "\n  mutation EnterChatroom($chatroomId: Float!) {\n    enterChatroom(chatroomId: $chatroomId)\n  }\n": typeof types.EnterChatroomDocument,
    "\n  mutation LeaveChatroom($chatroomId: Float!) {\n    leaveChatroom(chatroomId: $chatroomId)\n  }\n": typeof types.LeaveChatroomDocument,
    "\n  mutation Login($logInInput: LogInInput!) {\n    login(LogInInput: $logInInput) {\n      user {\n        id\n        email\n        fullname\n        avatarUrl\n      }\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": typeof types.LogoutDocument,
    "\n  mutation Register($registerInput: RegisterInput!) {\n    register(RegisterInput: $registerInput) {\n      user {\n        id\n        email\n        fullname\n        avatarUrl\n      }\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  mutation SendMessage($chatroomId: Float!, $content: String!, $image: Upload) {\n    sendMessage(chatroomId: $chatroomId, content: $content, image: $image) {\n      node {\n        id\n        content\n        imageUrl\n        createdAt\n        user {\n          id\n          fullname\n          avatarUrl\n        }\n      }\n      cursor\n    }\n  }\n": typeof types.SendMessageDocument,
    "\n  mutation UpdateUserProfile($fullname: String!, $file: Upload) {\n    updateUserProfile(fullname: $fullname, file: $file) {\n      id\n      email\n      fullname\n      avatarUrl\n    }\n  }\n": typeof types.UpdateUserProfileDocument,
    "\n  mutation UserStartedTypingMutation($chatroomId: Float!) {\n    userStartedTypingMutation(chatroomId: $chatroomId) {\n      id\n      fullname\n      email\n    }\n  }\n": typeof types.UserStartedTypingMutationDocument,
    "\n  mutation UserStoppedTypingMutation($chatroomId: Float!) {\n    userStoppedTypingMutation(chatroomId: $chatroomId) {\n      id\n      fullname\n      email\n    }\n  }\n": typeof types.UserStoppedTypingMutationDocument,
    "\n  query FindUserById($id: Int!) {\n    findUserById(id: $id) {\n      id\n      fullname\n      email\n    }\n  }\n": typeof types.FindUserByIdDocument,
    "\n  query GetChatroomsForUser($userId: Float!) {\n    getChatroomsForUser(userId: $userId) {\n      id\n      name\n      colorHex\n      image\n      description\n      # Solo el último mensaje\n      messages {\n        id\n        content\n        createdAt\n        user {\n          id\n          fullname\n        }\n      }\n      # Usuarios totales\n      users {\n        id\n      }\n    }\n  }\n": typeof types.GetChatroomsForUserDocument,
    "\n  query GetChatroomsForUserSideBar($userId: Float!) {\n    getChatroomsForUser(userId: $userId) {\n      id\n      name\n      colorHex\n    }\n  }\n": typeof types.GetChatroomsForUserSideBarDocument,
    "\n  query GetMessagesForChatroom($chatroomId: Float!, $take: Int!, $cursor: Int) {\n    getMessagesForChatroom(\n      chatroomId: $chatroomId\n      take: $take\n      cursor: $cursor\n    ) {\n      edges {\n        node {\n          id\n          content\n          imageUrl\n          createdAt\n          user {\n            id\n            fullname\n            avatarUrl\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      totalCount\n    }\n  }\n": typeof types.GetMessagesForChatroomDocument,
    "\n  query GetUsersOfChatroom($chatroomId: Float!) {\n    # getUsersOfChatroom(chatroomId: $chatroomId) {\n    #   id\n    #   fullname\n    #   email\n    #   avatarUrl\n    # }\n    getChatroomById(chatroomId: $chatroomId) {\n      id\n      name\n      adminId\n      access\n      description\n      colorHex\n      image\n      users {\n        id\n        fullname\n        avatarUrl\n      }\n    }\n  }\n": typeof types.GetUsersOfChatroomDocument,
    "\n  query Hello {\n    hello\n  }\n": typeof types.HelloDocument,
    "\n  query GetChatroomsForSearch($searchTerm: String!, $limit: Int!) {\n    getChatroomsForSearch(searchTerm: $searchTerm, limit: $limit) {\n      chatrooms {\n        id\n        name\n        colorHex\n        image\n        description\n        access\n        createdAt\n      }\n      totalCount\n    }\n  }\n": typeof types.GetChatroomsForSearchDocument,
    "\n  query SearchUsers($fullname: String!) {\n    searchUsers(fullname: $fullname) {\n      id\n      fullname\n      email\n    }\n  }\n": typeof types.SearchUsersDocument,
    "\n  subscription LiveUsersInChatroom($chatroomId: Float!) {\n    liveUsersInChatroom(chatroomId: $chatroomId) {\n      id\n      fullname\n      avatarUrl\n      email\n    }\n  }\n": typeof types.LiveUsersInChatroomDocument,
    "\n  subscription NewMessage($chatroomId: Int!) {\n    newMessage(chatroomId: $chatroomId) {\n      node {\n        id\n        content\n        imageUrl\n        # createdAt\n        user {\n          id\n          fullname\n          avatarUrl\n        }\n      }\n      cursor\n    }\n  }\n": typeof types.NewMessageDocument,
    "\n  subscription UserStartedTyping($chatroomId: Float!, $userId: Float!) {\n    userStartedTyping(chatroomId: $chatroomId, userId: $userId) {\n      id\n      fullname\n      email\n      avatarUrl\n    }\n  }\n": typeof types.UserStartedTypingDocument,
    "\n  subscription UserStoppedTyping($chatroomId: Float!, $userId: Float!) {\n    userStoppedTyping(chatroomId: $chatroomId, userId: $userId) {\n      id\n      fullname\n      email\n      avatarUrl\n    }\n  }\n": typeof types.UserStoppedTypingDocument,
};
const documents: Documents = {
    "\n  mutation AddUsersToChatroom($chatroomId: Float!, $userIds: [Float!]!) {\n    addUsersToChatroom(chatroomId: $chatroomId, userIds: $userIds)\n  }\n": types.AddUsersToChatroomDocument,
    "\n  mutation CreateChatroom($createChatroomInput: CreateChatroomInput!) {\n    createChatroom(createChatroomInput: $createChatroomInput) {\n      name\n      id\n    }\n  }\n": types.CreateChatroomDocument,
    "\n  mutation DeleteChatroom($chatroomId: Float!) {\n    deleteChatroom(chatroomId: $chatroomId)\n  }\n": types.DeleteChatroomDocument,
    "\n  mutation EnterChatroom($chatroomId: Float!) {\n    enterChatroom(chatroomId: $chatroomId)\n  }\n": types.EnterChatroomDocument,
    "\n  mutation LeaveChatroom($chatroomId: Float!) {\n    leaveChatroom(chatroomId: $chatroomId)\n  }\n": types.LeaveChatroomDocument,
    "\n  mutation Login($logInInput: LogInInput!) {\n    login(LogInInput: $logInInput) {\n      user {\n        id\n        email\n        fullname\n        avatarUrl\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation Register($registerInput: RegisterInput!) {\n    register(RegisterInput: $registerInput) {\n      user {\n        id\n        email\n        fullname\n        avatarUrl\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation SendMessage($chatroomId: Float!, $content: String!, $image: Upload) {\n    sendMessage(chatroomId: $chatroomId, content: $content, image: $image) {\n      node {\n        id\n        content\n        imageUrl\n        createdAt\n        user {\n          id\n          fullname\n          avatarUrl\n        }\n      }\n      cursor\n    }\n  }\n": types.SendMessageDocument,
    "\n  mutation UpdateUserProfile($fullname: String!, $file: Upload) {\n    updateUserProfile(fullname: $fullname, file: $file) {\n      id\n      email\n      fullname\n      avatarUrl\n    }\n  }\n": types.UpdateUserProfileDocument,
    "\n  mutation UserStartedTypingMutation($chatroomId: Float!) {\n    userStartedTypingMutation(chatroomId: $chatroomId) {\n      id\n      fullname\n      email\n    }\n  }\n": types.UserStartedTypingMutationDocument,
    "\n  mutation UserStoppedTypingMutation($chatroomId: Float!) {\n    userStoppedTypingMutation(chatroomId: $chatroomId) {\n      id\n      fullname\n      email\n    }\n  }\n": types.UserStoppedTypingMutationDocument,
    "\n  query FindUserById($id: Int!) {\n    findUserById(id: $id) {\n      id\n      fullname\n      email\n    }\n  }\n": types.FindUserByIdDocument,
    "\n  query GetChatroomsForUser($userId: Float!) {\n    getChatroomsForUser(userId: $userId) {\n      id\n      name\n      colorHex\n      image\n      description\n      # Solo el último mensaje\n      messages {\n        id\n        content\n        createdAt\n        user {\n          id\n          fullname\n        }\n      }\n      # Usuarios totales\n      users {\n        id\n      }\n    }\n  }\n": types.GetChatroomsForUserDocument,
    "\n  query GetChatroomsForUserSideBar($userId: Float!) {\n    getChatroomsForUser(userId: $userId) {\n      id\n      name\n      colorHex\n    }\n  }\n": types.GetChatroomsForUserSideBarDocument,
    "\n  query GetMessagesForChatroom($chatroomId: Float!, $take: Int!, $cursor: Int) {\n    getMessagesForChatroom(\n      chatroomId: $chatroomId\n      take: $take\n      cursor: $cursor\n    ) {\n      edges {\n        node {\n          id\n          content\n          imageUrl\n          createdAt\n          user {\n            id\n            fullname\n            avatarUrl\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      totalCount\n    }\n  }\n": types.GetMessagesForChatroomDocument,
    "\n  query GetUsersOfChatroom($chatroomId: Float!) {\n    # getUsersOfChatroom(chatroomId: $chatroomId) {\n    #   id\n    #   fullname\n    #   email\n    #   avatarUrl\n    # }\n    getChatroomById(chatroomId: $chatroomId) {\n      id\n      name\n      adminId\n      access\n      description\n      colorHex\n      image\n      users {\n        id\n        fullname\n        avatarUrl\n      }\n    }\n  }\n": types.GetUsersOfChatroomDocument,
    "\n  query Hello {\n    hello\n  }\n": types.HelloDocument,
    "\n  query GetChatroomsForSearch($searchTerm: String!, $limit: Int!) {\n    getChatroomsForSearch(searchTerm: $searchTerm, limit: $limit) {\n      chatrooms {\n        id\n        name\n        colorHex\n        image\n        description\n        access\n        createdAt\n      }\n      totalCount\n    }\n  }\n": types.GetChatroomsForSearchDocument,
    "\n  query SearchUsers($fullname: String!) {\n    searchUsers(fullname: $fullname) {\n      id\n      fullname\n      email\n    }\n  }\n": types.SearchUsersDocument,
    "\n  subscription LiveUsersInChatroom($chatroomId: Float!) {\n    liveUsersInChatroom(chatroomId: $chatroomId) {\n      id\n      fullname\n      avatarUrl\n      email\n    }\n  }\n": types.LiveUsersInChatroomDocument,
    "\n  subscription NewMessage($chatroomId: Int!) {\n    newMessage(chatroomId: $chatroomId) {\n      node {\n        id\n        content\n        imageUrl\n        # createdAt\n        user {\n          id\n          fullname\n          avatarUrl\n        }\n      }\n      cursor\n    }\n  }\n": types.NewMessageDocument,
    "\n  subscription UserStartedTyping($chatroomId: Float!, $userId: Float!) {\n    userStartedTyping(chatroomId: $chatroomId, userId: $userId) {\n      id\n      fullname\n      email\n      avatarUrl\n    }\n  }\n": types.UserStartedTypingDocument,
    "\n  subscription UserStoppedTyping($chatroomId: Float!, $userId: Float!) {\n    userStoppedTyping(chatroomId: $chatroomId, userId: $userId) {\n      id\n      fullname\n      email\n      avatarUrl\n    }\n  }\n": types.UserStoppedTypingDocument,
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
export function graphql(source: "\n  mutation AddUsersToChatroom($chatroomId: Float!, $userIds: [Float!]!) {\n    addUsersToChatroom(chatroomId: $chatroomId, userIds: $userIds)\n  }\n"): (typeof documents)["\n  mutation AddUsersToChatroom($chatroomId: Float!, $userIds: [Float!]!) {\n    addUsersToChatroom(chatroomId: $chatroomId, userIds: $userIds)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateChatroom($createChatroomInput: CreateChatroomInput!) {\n    createChatroom(createChatroomInput: $createChatroomInput) {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateChatroom($createChatroomInput: CreateChatroomInput!) {\n    createChatroom(createChatroomInput: $createChatroomInput) {\n      name\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteChatroom($chatroomId: Float!) {\n    deleteChatroom(chatroomId: $chatroomId)\n  }\n"): (typeof documents)["\n  mutation DeleteChatroom($chatroomId: Float!) {\n    deleteChatroom(chatroomId: $chatroomId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EnterChatroom($chatroomId: Float!) {\n    enterChatroom(chatroomId: $chatroomId)\n  }\n"): (typeof documents)["\n  mutation EnterChatroom($chatroomId: Float!) {\n    enterChatroom(chatroomId: $chatroomId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LeaveChatroom($chatroomId: Float!) {\n    leaveChatroom(chatroomId: $chatroomId)\n  }\n"): (typeof documents)["\n  mutation LeaveChatroom($chatroomId: Float!) {\n    leaveChatroom(chatroomId: $chatroomId)\n  }\n"];
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
export function graphql(source: "\n  mutation SendMessage($chatroomId: Float!, $content: String!, $image: Upload) {\n    sendMessage(chatroomId: $chatroomId, content: $content, image: $image) {\n      node {\n        id\n        content\n        imageUrl\n        createdAt\n        user {\n          id\n          fullname\n          avatarUrl\n        }\n      }\n      cursor\n    }\n  }\n"): (typeof documents)["\n  mutation SendMessage($chatroomId: Float!, $content: String!, $image: Upload) {\n    sendMessage(chatroomId: $chatroomId, content: $content, image: $image) {\n      node {\n        id\n        content\n        imageUrl\n        createdAt\n        user {\n          id\n          fullname\n          avatarUrl\n        }\n      }\n      cursor\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserProfile($fullname: String!, $file: Upload) {\n    updateUserProfile(fullname: $fullname, file: $file) {\n      id\n      email\n      fullname\n      avatarUrl\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserProfile($fullname: String!, $file: Upload) {\n    updateUserProfile(fullname: $fullname, file: $file) {\n      id\n      email\n      fullname\n      avatarUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UserStartedTypingMutation($chatroomId: Float!) {\n    userStartedTypingMutation(chatroomId: $chatroomId) {\n      id\n      fullname\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation UserStartedTypingMutation($chatroomId: Float!) {\n    userStartedTypingMutation(chatroomId: $chatroomId) {\n      id\n      fullname\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UserStoppedTypingMutation($chatroomId: Float!) {\n    userStoppedTypingMutation(chatroomId: $chatroomId) {\n      id\n      fullname\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation UserStoppedTypingMutation($chatroomId: Float!) {\n    userStoppedTypingMutation(chatroomId: $chatroomId) {\n      id\n      fullname\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindUserById($id: Int!) {\n    findUserById(id: $id) {\n      id\n      fullname\n      email\n    }\n  }\n"): (typeof documents)["\n  query FindUserById($id: Int!) {\n    findUserById(id: $id) {\n      id\n      fullname\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetChatroomsForUser($userId: Float!) {\n    getChatroomsForUser(userId: $userId) {\n      id\n      name\n      colorHex\n      image\n      description\n      # Solo el último mensaje\n      messages {\n        id\n        content\n        createdAt\n        user {\n          id\n          fullname\n        }\n      }\n      # Usuarios totales\n      users {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetChatroomsForUser($userId: Float!) {\n    getChatroomsForUser(userId: $userId) {\n      id\n      name\n      colorHex\n      image\n      description\n      # Solo el último mensaje\n      messages {\n        id\n        content\n        createdAt\n        user {\n          id\n          fullname\n        }\n      }\n      # Usuarios totales\n      users {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetChatroomsForUserSideBar($userId: Float!) {\n    getChatroomsForUser(userId: $userId) {\n      id\n      name\n      colorHex\n    }\n  }\n"): (typeof documents)["\n  query GetChatroomsForUserSideBar($userId: Float!) {\n    getChatroomsForUser(userId: $userId) {\n      id\n      name\n      colorHex\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMessagesForChatroom($chatroomId: Float!, $take: Int!, $cursor: Int) {\n    getMessagesForChatroom(\n      chatroomId: $chatroomId\n      take: $take\n      cursor: $cursor\n    ) {\n      edges {\n        node {\n          id\n          content\n          imageUrl\n          createdAt\n          user {\n            id\n            fullname\n            avatarUrl\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query GetMessagesForChatroom($chatroomId: Float!, $take: Int!, $cursor: Int) {\n    getMessagesForChatroom(\n      chatroomId: $chatroomId\n      take: $take\n      cursor: $cursor\n    ) {\n      edges {\n        node {\n          id\n          content\n          imageUrl\n          createdAt\n          user {\n            id\n            fullname\n            avatarUrl\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsersOfChatroom($chatroomId: Float!) {\n    # getUsersOfChatroom(chatroomId: $chatroomId) {\n    #   id\n    #   fullname\n    #   email\n    #   avatarUrl\n    # }\n    getChatroomById(chatroomId: $chatroomId) {\n      id\n      name\n      adminId\n      access\n      description\n      colorHex\n      image\n      users {\n        id\n        fullname\n        avatarUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUsersOfChatroom($chatroomId: Float!) {\n    # getUsersOfChatroom(chatroomId: $chatroomId) {\n    #   id\n    #   fullname\n    #   email\n    #   avatarUrl\n    # }\n    getChatroomById(chatroomId: $chatroomId) {\n      id\n      name\n      adminId\n      access\n      description\n      colorHex\n      image\n      users {\n        id\n        fullname\n        avatarUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Hello {\n    hello\n  }\n"): (typeof documents)["\n  query Hello {\n    hello\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetChatroomsForSearch($searchTerm: String!, $limit: Int!) {\n    getChatroomsForSearch(searchTerm: $searchTerm, limit: $limit) {\n      chatrooms {\n        id\n        name\n        colorHex\n        image\n        description\n        access\n        createdAt\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query GetChatroomsForSearch($searchTerm: String!, $limit: Int!) {\n    getChatroomsForSearch(searchTerm: $searchTerm, limit: $limit) {\n      chatrooms {\n        id\n        name\n        colorHex\n        image\n        description\n        access\n        createdAt\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchUsers($fullname: String!) {\n    searchUsers(fullname: $fullname) {\n      id\n      fullname\n      email\n    }\n  }\n"): (typeof documents)["\n  query SearchUsers($fullname: String!) {\n    searchUsers(fullname: $fullname) {\n      id\n      fullname\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription LiveUsersInChatroom($chatroomId: Float!) {\n    liveUsersInChatroom(chatroomId: $chatroomId) {\n      id\n      fullname\n      avatarUrl\n      email\n    }\n  }\n"): (typeof documents)["\n  subscription LiveUsersInChatroom($chatroomId: Float!) {\n    liveUsersInChatroom(chatroomId: $chatroomId) {\n      id\n      fullname\n      avatarUrl\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription NewMessage($chatroomId: Int!) {\n    newMessage(chatroomId: $chatroomId) {\n      node {\n        id\n        content\n        imageUrl\n        # createdAt\n        user {\n          id\n          fullname\n          avatarUrl\n        }\n      }\n      cursor\n    }\n  }\n"): (typeof documents)["\n  subscription NewMessage($chatroomId: Int!) {\n    newMessage(chatroomId: $chatroomId) {\n      node {\n        id\n        content\n        imageUrl\n        # createdAt\n        user {\n          id\n          fullname\n          avatarUrl\n        }\n      }\n      cursor\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription UserStartedTyping($chatroomId: Float!, $userId: Float!) {\n    userStartedTyping(chatroomId: $chatroomId, userId: $userId) {\n      id\n      fullname\n      email\n      avatarUrl\n    }\n  }\n"): (typeof documents)["\n  subscription UserStartedTyping($chatroomId: Float!, $userId: Float!) {\n    userStartedTyping(chatroomId: $chatroomId, userId: $userId) {\n      id\n      fullname\n      email\n      avatarUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription UserStoppedTyping($chatroomId: Float!, $userId: Float!) {\n    userStoppedTyping(chatroomId: $chatroomId, userId: $userId) {\n      id\n      fullname\n      email\n      avatarUrl\n    }\n  }\n"): (typeof documents)["\n  subscription UserStoppedTyping($chatroomId: Float!, $userId: Float!) {\n    userStoppedTyping(chatroomId: $chatroomId, userId: $userId) {\n      id\n      fullname\n      email\n      avatarUrl\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;