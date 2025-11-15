import type {
  LogInInput,
  //   LogInResponse,
  LoginMutation,
  LoginMutationVariables,
  RegisterInput,
  //   RegisterResponse,
  RegisterMutation,
  RegisterMutationVariables,
  LogoutMutation,
  LogoutMutationVariables,
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
} from "@/gql/graphql";

import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  REFRESH_TOKEN,
} from "@/graphql/mutations";

import { useMutation } from "@apollo/client/react";

export function useAuthMutations() {
  const [
    loginMutation,
    { loading: loginLoading, error: loginError, data: loginData },
  ] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_USER);

  const login = (logInInput: LogInInput) =>
    loginMutation({ variables: { logInInput } });

  const [
    registerMutation,
    { loading: registerLoading, error: registerError, data: registerData },
  ] = useMutation<RegisterMutation, RegisterMutationVariables>(REGISTER_USER);
  const register = (registerInput: RegisterInput) =>
    registerMutation({ variables: { registerInput } });

  const [
    logoutMutation,
    { loading: logoutLoading, error: logoutError, data: logoutData },
  ] = useMutation<LogoutMutation, LogoutMutationVariables>(LOGOUT_USER);

  const logout = () => logoutMutation();

  const [
    refreshTokenMutation,
    {
      loading: refreshTokenLoading,
      error: refreshTokenError,
      data: refreshTokenData,
    },
  ] = useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(
    REFRESH_TOKEN
  );

  const refershToken = () => refreshTokenMutation();

  return {
    login,
    loginLoading,
    loginError,
    loginData,

    register,
    registerLoading,
    registerError,
    registerData,

    logout,
    logoutLoading,
    logoutError,
    logoutData,

    refershToken,
    refreshTokenLoading,
    refreshTokenError,
    refreshTokenData,
  };
}
