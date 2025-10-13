/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

/** Tipos de acceso de la sala de chat */
export enum ChatroomAccess {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type ChatroomEntity = {
  __typename?: 'ChatroomEntity';
  access: ChatroomAccess;
  adminId?: Maybe<Scalars['Int']['output']>;
  colorHex?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  messages?: Maybe<Array<MessageEntity>>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<UserEntity>>;
};

export type CreateChatroomInput = {
  access?: Scalars['String']['input'];
  colorHex?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  userIds?: Array<Scalars['String']['input']>;
};

export type LogInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LogInResponse = {
  __typename?: 'LogInResponse';
  user: UserEntity;
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  cursor: Scalars['Int']['output'];
  node: MessageEntity;
};

export type MessageEntity = {
  __typename?: 'MessageEntity';
  chatroom?: Maybe<ChatroomEntity>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: UserEntity;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUsersToChatroom: Scalars['String']['output'];
  createChatroom: ChatroomEntity;
  deleteChatroom: Scalars['String']['output'];
  enterChatroom: Scalars['Boolean']['output'];
  leaveChatroom: Scalars['Boolean']['output'];
  /** login user */
  login: LogInResponse;
  /** logout user */
  logout: Scalars['String']['output'];
  /** refresh token */
  refreshToken: Scalars['String']['output'];
  /** register user */
  register: RegisterResponse;
  sendMessage: MessageEdge;
  /** Update user profile */
  updateUserProfile: UserEntity;
  userStartedTypingMutation: UserEntity;
  userStoppedTypingMutation: UserEntity;
};


export type MutationAddUsersToChatroomArgs = {
  chatroomId: Scalars['Float']['input'];
  userIds: Array<Scalars['Float']['input']>;
};


export type MutationCreateChatroomArgs = {
  createChatroomInput: CreateChatroomInput;
};


export type MutationDeleteChatroomArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type MutationEnterChatroomArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type MutationLeaveChatroomArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  LogInInput: LogInInput;
};


export type MutationRegisterArgs = {
  RegisterInput: RegisterInput;
};


export type MutationSendMessageArgs = {
  chatroomId: Scalars['Float']['input'];
  content: Scalars['String']['input'];
  image?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationUpdateUserProfileArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  fullname: Scalars['String']['input'];
};


export type MutationUserStartedTypingMutationArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type MutationUserStoppedTypingMutationArgs = {
  chatroomId: Scalars['Float']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type PaginatedMessage = {
  __typename?: 'PaginatedMessage';
  edges: Array<MessageEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** Find all users */
  findAllUsers: Array<UserEntity>;
  /** Find user by id */
  findUserById: UserEntity;
  /** Get a chatroom by id */
  getChatroomById: ChatroomEntity;
  getChatroomsForUser: Array<ChatroomEntity>;
  getMessagesForChatroom: PaginatedMessage;
  getUsersOfChatroom: Array<UserEntity>;
  /** just return hello */
  hello: Scalars['String']['output'];
  searchUsers: Array<UserEntity>;
};


export type QueryFindUserByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetChatroomByIdArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type QueryGetChatroomsForUserArgs = {
  userId: Scalars['Float']['input'];
};


export type QueryGetMessagesForChatroomArgs = {
  chatroomId: Scalars['Float']['input'];
  cursor?: InputMaybe<Scalars['Int']['input']>;
  take?: Scalars['Int']['input'];
};


export type QueryGetUsersOfChatroomArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type QuerySearchUsersArgs = {
  fullname: Scalars['String']['input'];
};

export type RegisterInput = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  user?: Maybe<UserEntity>;
};

export type Subscription = {
  __typename?: 'Subscription';
  liveUsersInChatroom?: Maybe<Array<UserEntity>>;
  newMessage?: Maybe<MessageEdge>;
  userStartedTyping?: Maybe<UserEntity>;
  userStoppedTyping?: Maybe<UserEntity>;
};


export type SubscriptionLiveUsersInChatroomArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type SubscriptionNewMessageArgs = {
  chatroomId: Scalars['Int']['input'];
};


export type SubscriptionUserStartedTypingArgs = {
  chatroomId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};


export type SubscriptionUserStoppedTypingArgs = {
  chatroomId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  password?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AddUsersToChatroomMutationVariables = Exact<{
  chatroomId: Scalars['Float']['input'];
  userIds: Array<Scalars['Float']['input']> | Scalars['Float']['input'];
}>;


export type AddUsersToChatroomMutation = { __typename?: 'Mutation', addUsersToChatroom: string };

export type CreateChatroomMutationVariables = Exact<{
  createChatroomInput: CreateChatroomInput;
}>;


export type CreateChatroomMutation = { __typename?: 'Mutation', createChatroom: { __typename?: 'ChatroomEntity', name?: string | null, id?: number | null } };

export type DeleteChatroomMutationVariables = Exact<{
  chatroomId: Scalars['Float']['input'];
}>;


export type DeleteChatroomMutation = { __typename?: 'Mutation', deleteChatroom: string };

export type EnterChatroomMutationVariables = Exact<{
  chatroomId: Scalars['Float']['input'];
}>;


export type EnterChatroomMutation = { __typename?: 'Mutation', enterChatroom: boolean };

export type LeaveChatroomMutationVariables = Exact<{
  chatroomId: Scalars['Float']['input'];
}>;


export type LeaveChatroomMutation = { __typename?: 'Mutation', leaveChatroom: boolean };

export type LoginMutationVariables = Exact<{
  logInInput: LogInInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LogInResponse', user: { __typename?: 'UserEntity', id: number, email: string, fullname: string, avatarUrl?: string | null } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', user?: { __typename?: 'UserEntity', id: number, email: string, fullname: string, avatarUrl?: string | null } | null } };

export type SendMessageMutationVariables = Exact<{
  chatroomId: Scalars['Float']['input'];
  content: Scalars['String']['input'];
  image?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'MessageEdge', cursor: number, node: { __typename?: 'MessageEntity', id: number, content: string, imageUrl?: string | null, createdAt: any, user: { __typename?: 'UserEntity', id: number, fullname: string, avatarUrl?: string | null } } } };

export type UpdateUserProfileMutationVariables = Exact<{
  fullname: Scalars['String']['input'];
  file?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile: { __typename?: 'UserEntity', id: number, email: string, fullname: string, avatarUrl?: string | null } };

export type UserStartedTypingMutationMutationVariables = Exact<{
  chatroomId: Scalars['Float']['input'];
}>;


export type UserStartedTypingMutationMutation = { __typename?: 'Mutation', userStartedTypingMutation: { __typename?: 'UserEntity', id: number, fullname: string, email: string } };

export type UserStoppedTypingMutationMutationVariables = Exact<{
  chatroomId: Scalars['Float']['input'];
}>;


export type UserStoppedTypingMutationMutation = { __typename?: 'Mutation', userStoppedTypingMutation: { __typename?: 'UserEntity', id: number, fullname: string, email: string } };

export type FindUserByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindUserByIdQuery = { __typename?: 'Query', findUserById: { __typename?: 'UserEntity', id: number, fullname: string, email: string } };

export type GetChatroomsForUserQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetChatroomsForUserQuery = { __typename?: 'Query', getChatroomsForUser: Array<{ __typename?: 'ChatroomEntity', id?: number | null, name?: string | null, colorHex?: string | null, image?: string | null, description?: string | null, messages?: Array<{ __typename?: 'MessageEntity', id: number, content: string, createdAt: any, user: { __typename?: 'UserEntity', id: number, fullname: string } }> | null, users?: Array<{ __typename?: 'UserEntity', id: number }> | null }> };

export type GetChatroomsForUserSideBarQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetChatroomsForUserSideBarQuery = { __typename?: 'Query', getChatroomsForUser: Array<{ __typename?: 'ChatroomEntity', id?: number | null, name?: string | null, colorHex?: string | null }> };

export type GetMessagesForChatroomQueryVariables = Exact<{
  chatroomId: Scalars['Float']['input'];
  take: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMessagesForChatroomQuery = { __typename?: 'Query', getMessagesForChatroom: { __typename?: 'PaginatedMessage', totalCount: number, edges: Array<{ __typename?: 'MessageEdge', cursor: number, node: { __typename?: 'MessageEntity', id: number, content: string, imageUrl?: string | null, createdAt: any, user: { __typename?: 'UserEntity', id: number, fullname: string, avatarUrl?: string | null } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: number | null } } };

export type GetUsersOfChatroomQueryVariables = Exact<{
  chatroomId: Scalars['Float']['input'];
}>;


export type GetUsersOfChatroomQuery = { __typename?: 'Query', getChatroomById: { __typename?: 'ChatroomEntity', id?: number | null, name?: string | null, adminId?: number | null, access: ChatroomAccess, description?: string | null, colorHex?: string | null, image?: string | null, users?: Array<{ __typename?: 'UserEntity', id: number, fullname: string, avatarUrl?: string | null }> | null } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type SearchUsersQueryVariables = Exact<{
  fullname: Scalars['String']['input'];
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers: Array<{ __typename?: 'UserEntity', id: number, fullname: string, email: string }> };

export type LiveUsersInChatroomSubscriptionVariables = Exact<{
  chatroomId: Scalars['Float']['input'];
}>;


export type LiveUsersInChatroomSubscription = { __typename?: 'Subscription', liveUsersInChatroom?: Array<{ __typename?: 'UserEntity', id: number, fullname: string, avatarUrl?: string | null, email: string }> | null };

export type NewMessageSubscriptionVariables = Exact<{
  chatroomId: Scalars['Int']['input'];
}>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage?: { __typename?: 'MessageEdge', cursor: number, node: { __typename?: 'MessageEntity', id: number, content: string, imageUrl?: string | null, user: { __typename?: 'UserEntity', id: number, fullname: string, avatarUrl?: string | null } } } | null };

export type UserStartedTypingSubscriptionVariables = Exact<{
  chatroomId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
}>;


export type UserStartedTypingSubscription = { __typename?: 'Subscription', userStartedTyping?: { __typename?: 'UserEntity', id: number, fullname: string, email: string, avatarUrl?: string | null } | null };

export type UserStoppedTypingSubscriptionVariables = Exact<{
  chatroomId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
}>;


export type UserStoppedTypingSubscription = { __typename?: 'Subscription', userStoppedTyping?: { __typename?: 'UserEntity', id: number, fullname: string, email: string, avatarUrl?: string | null } | null };


export const AddUsersToChatroomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUsersToChatroom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUsersToChatroom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatroomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}}]}]}}]} as unknown as DocumentNode<AddUsersToChatroomMutation, AddUsersToChatroomMutationVariables>;
export const CreateChatroomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChatroom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createChatroomInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateChatroomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChatroom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createChatroomInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createChatroomInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateChatroomMutation, CreateChatroomMutationVariables>;
export const DeleteChatroomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteChatroom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteChatroom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatroomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}}}]}]}}]} as unknown as DocumentNode<DeleteChatroomMutation, DeleteChatroomMutationVariables>;
export const EnterChatroomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnterChatroom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enterChatroom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatroomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}}}]}]}}]} as unknown as DocumentNode<EnterChatroomMutation, EnterChatroomMutationVariables>;
export const LeaveChatroomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveChatroom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveChatroom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatroomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}}}]}]}}]} as unknown as DocumentNode<LeaveChatroomMutation, LeaveChatroomMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logInInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogInInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"LogInInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logInInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"RegisterInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatroomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const UpdateUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullname"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]} as unknown as DocumentNode<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const UserStartedTypingMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserStartedTypingMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userStartedTypingMutation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatroomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UserStartedTypingMutationMutation, UserStartedTypingMutationMutationVariables>;
export const UserStoppedTypingMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserStoppedTypingMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userStoppedTypingMutation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatroomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UserStoppedTypingMutationMutation, UserStoppedTypingMutationMutationVariables>;
export const FindUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<FindUserByIdQuery, FindUserByIdQueryVariables>;
export const GetChatroomsForUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChatroomsForUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChatroomsForUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetChatroomsForUserQuery, GetChatroomsForUserQueryVariables>;
export const GetChatroomsForUserSideBarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChatroomsForUserSideBar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChatroomsForUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}}]}}]}}]} as unknown as DocumentNode<GetChatroomsForUserSideBarQuery, GetChatroomsForUserSideBarQueryVariables>;
export const GetMessagesForChatroomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessagesForChatroom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMessagesForChatroom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatroomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetMessagesForChatroomQuery, GetMessagesForChatroomQueryVariables>;
export const GetUsersOfChatroomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersOfChatroom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChatroomById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatroomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"adminId"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersOfChatroomQuery, GetUsersOfChatroomQueryVariables>;
export const HelloDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Hello"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hello"}}]}}]} as unknown as DocumentNode<HelloQuery, HelloQueryVariables>;
export const SearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullname"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;
export const LiveUsersInChatroomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"LiveUsersInChatroom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liveUsersInChatroom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatroomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<LiveUsersInChatroomSubscription, LiveUsersInChatroomSubscriptionVariables>;
export const NewMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"NewMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatroomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}}]}}]} as unknown as DocumentNode<NewMessageSubscription, NewMessageSubscriptionVariables>;
export const UserStartedTypingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"UserStartedTyping"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userStartedTyping"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatroomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]} as unknown as DocumentNode<UserStartedTypingSubscription, UserStartedTypingSubscriptionVariables>;
export const UserStoppedTypingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"UserStoppedTyping"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userStoppedTyping"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatroomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]} as unknown as DocumentNode<UserStoppedTypingSubscription, UserStoppedTypingSubscriptionVariables>;