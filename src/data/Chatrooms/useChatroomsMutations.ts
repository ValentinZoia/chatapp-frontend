import type {
  CreateChatroomMutation,
  CreateChatroomMutationVariables,
  DeleteChatroomMutation,
  DeleteChatroomMutationVariables,
  EnterChatroomMutation,
  EnterChatroomMutationVariables,
  LeaveChatroomMutation,
  LeaveChatroomMutationVariables,
  AddUsersToChatroomMutation,
  AddUsersToChatroomMutationVariables,
} from "@/gql/graphql";
import {
  CREATE_CHATROOM,
  DELETE_CHATROOM,
  ENTER_CHATROOM,
  LEAVE_CHATROOM,
  ADD_USERS_TO_CHATROOM,
} from "@/graphql/mutations";
import { useMutation } from "@apollo/client/react";

export function useChatroomMutations() {
  // CREATE CHATROOM FREATURE
  const [
    createChatroomMutation,
    {
      loading: createChatroomLoading,
      error: createChatroomError,
      data: createChatroomData,
    },
  ] = useMutation<CreateChatroomMutation, CreateChatroomMutationVariables>(
    CREATE_CHATROOM
  );

  const createChatroom = (input: CreateChatroomMutationVariables) => {
    return createChatroomMutation({ variables: input });
  };

  //DELETE CHATROOM FEATURE
  const [
    deleteChatroomMutation,
    {
      loading: deleteChatroomLoading,
      error: deleteChatroomError,
      data: deleteChatroomData,
    },
  ] = useMutation<DeleteChatroomMutation, DeleteChatroomMutationVariables>(
    DELETE_CHATROOM
  );

  const deleteChatroom = (input: DeleteChatroomMutationVariables) => {
    return deleteChatroomMutation({ variables: input });
  };

  //ENTER CHATROOM FEATURE
  const [
    enterChatroomMutation,
    {
      loading: enterChatroomLoading,
      error: enterChatroomError,
      data: enterChatroomData,
    },
  ] = useMutation<EnterChatroomMutation, EnterChatroomMutationVariables>(
    ENTER_CHATROOM
  );

  const enterChatroom = (input: EnterChatroomMutationVariables) => {
    return enterChatroomMutation({ variables: input });
  };

  //LEAVE CHATROOM FEATURE
  const [
    leaveChatroomMutation,
    {
      loading: leaveChatroomLoading,
      error: leaveChatroomError,
      data: leaveChatroomData,
    },
  ] = useMutation<LeaveChatroomMutation, LeaveChatroomMutationVariables>(
    LEAVE_CHATROOM
  );

  const leaveChatroom = (input: LeaveChatroomMutationVariables) => {
    return leaveChatroomMutation({ variables: input });
  };

  //ADD USERS TO CHATROOM
  const [
    addUsersToChatroomMutation,
    {
      loading: addUsersToChatroomLoading,
      error: addUsersToChatroomError,
      data: addUsersToChatroomData,
    },
  ] = useMutation<
    AddUsersToChatroomMutation,
    AddUsersToChatroomMutationVariables
  >(ADD_USERS_TO_CHATROOM, {
    refetchQueries: ["GetChatroomsForUser"],
  });

  const addUsersToChatroom = (input: AddUsersToChatroomMutationVariables) => {
    return addUsersToChatroomMutation({ variables: input });
  };

  return {
    createChatroom,
    createChatroomLoading,
    createChatroomError,
    createChatroomData,

    deleteChatroom,
    deleteChatroomLoading,
    deleteChatroomError,
    deleteChatroomData,

    enterChatroom,
    enterChatroomLoading,
    enterChatroomError,
    enterChatroomData,

    leaveChatroom,
    leaveChatroomLoading,
    leaveChatroomError,
    leaveChatroomData,

    addUsersToChatroom,
    addUsersToChatroomLoading,
    addUsersToChatroomError,
    addUsersToChatroomData,
  };
}
