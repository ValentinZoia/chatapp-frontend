/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type InputMaybe<T> = Maybe<T>;
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

export type LogInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LogInResponse = {
  __typename?: 'LogInResponse';
  user: UserEntity;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** login user */
  login: LogInResponse;
  /** logout user */
  logout: Scalars['String']['output'];
  /** refresh token */
  refreshToken: Scalars['String']['output'];
  /** register user */
  register: RegisterResponse;
  /** Update user profile */
  updateUserProfile: UserEntity;
};


export type MutationLoginArgs = {
  LogInInput: LogInInput;
};


export type MutationRegisterArgs = {
  RegisterInput: RegisterInput;
};


export type MutationUpdateUserProfileArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  fullname: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Find all users */
  findAllUsers: Array<UserEntity>;
  /** Find user by id */
  findUserById: UserEntity;
  /** just return hello */
  hello: Scalars['String']['output'];
};


export type QueryFindUserByIdArgs = {
  id: Scalars['Int']['input'];
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

export type LogInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LogInResponse = {
  __typename?: 'LogInResponse';
  user: UserEntity;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** login user */
  login: LogInResponse;
  /** logout user */
  logout: Scalars['String']['output'];
  /** refresh token */
  refreshToken: Scalars['String']['output'];
  /** register user */
  register: RegisterResponse;
  /** Update user profile */
  updateUserProfile: UserEntity;
};


export type MutationLoginArgs = {
  LogInInput: LogInInput;
};


export type MutationRegisterArgs = {
  RegisterInput: RegisterInput;
};


export type MutationUpdateUserProfileArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  fullname: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Find all users */
  findAllUsers: Array<UserEntity>;
  /** Find user by id */
  findUserById: UserEntity;
  /** just return hello */
  hello: Scalars['String']['output'];
};


export type QueryFindUserByIdArgs = {
  id: Scalars['Int']['input'];
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
