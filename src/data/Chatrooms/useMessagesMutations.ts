import {
  SEND_MESSAGE,
  USER_STARTED_TYPING_MUTATION,
  USER_STOPPED_TYPING_MUTATION,
} from "@/graphql/mutations";

import type {
  SendMessageMutation,
  SendMessageMutationVariables,
  UserStartedTypingMutationMutation,
  UserStartedTypingMutationMutationVariables,
  UserStoppedTypingMutationMutation,
  UserStoppedTypingMutationMutationVariables,
} from "@/gql/graphql";

import { useMutation } from "@apollo/client/react";
import { GET_MESSAGES_FOR_CHATROOM } from "@/graphql/queries";

export function useMessagesMutations(userId?: number) {
  //send Message
  const [
    sendMessageMutation,
    {
      loading: sendMessageLoading,
      error: sendMessageError,
      data: sendMessageData,
    },
  ] = useMutation<SendMessageMutation, SendMessageMutationVariables>(
    SEND_MESSAGE,
    {
      refetchQueries: [
        {
          query: GET_MESSAGES_FOR_CHATROOM,
          variables: { userId },
        },
      ],
    }
  );

  const sendMessage = (input: SendMessageMutationVariables) => {
    return sendMessageMutation({ variables: input });
  };

  //started Typing

  const [
    startedTypingMutation,
    {
      loading: startedTypingLoading,
      error: startedTypingError,
      data: startedTypingData,
    },
  ] = useMutation<
    UserStartedTypingMutationMutation,
    UserStartedTypingMutationMutationVariables
  >(USER_STARTED_TYPING_MUTATION);

  const startedTyping = (input: UserStartedTypingMutationMutationVariables) => {
    return startedTypingMutation({ variables: input });
  };

  //stopped typing

  const [
    stoppedTypingMutation,
    {
      loading: stoppedTypingLoading,
      error: stoppedTypingError,
      data: stoppedTypingData,
    },
  ] = useMutation<
    UserStoppedTypingMutationMutation,
    UserStoppedTypingMutationMutationVariables
  >(USER_STOPPED_TYPING_MUTATION);

  const stoppedTyping = (input: UserStoppedTypingMutationMutationVariables) => {
    return stoppedTypingMutation({ variables: input });
  };

  return {
    //send Message
    sendMessage,
    sendMessageLoading,
    sendMessageError,
    sendMessageData,

    //started typing
    startedTyping,
    startedTypingLoading,
    startedTypingError,
    startedTypingData,

    //stopped typing
    stoppedTyping,
    stoppedTypingLoading,
    stoppedTypingError,
    stoppedTypingData,
  };
}
