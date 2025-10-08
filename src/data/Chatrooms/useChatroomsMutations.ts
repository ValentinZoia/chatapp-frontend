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
  CreateChatroomInput,
} from "@/gql/graphql";
import {
  CREATE_CHATROOM,
  DELETE_CHATROOM,
  ENTER_CHATROOM,
  LEAVE_CHATROOM,
  ADD_USERS_TO_CHATROOM,
} from "@/graphql/mutations";
import { GET_CHATROOMS_FOR_USER } from "@/graphql/queries";
import { useMutation } from "@apollo/client/react";

export function useChatroomMutations(userId?: number) {
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

  const createChatroom = (createChatroomInput: CreateChatroomInput) => {
    return createChatroomMutation({ variables: { createChatroomInput } });
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
    DELETE_CHATROOM,
    {
      refetchQueries: [
        { query: GET_CHATROOMS_FOR_USER, variables: { userId } },
      ], // Cambia '1' por el ID del usuario actual
    }
  );

  const deleteChatroom = (input: DeleteChatroomMutationVariables) => {
    return deleteChatroomMutation({
      variables: input,
      onCompleted: () => {
        console.log("Chatroom deleted successfully");
      },
    });
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
    refetchQueries: [{ query: GET_CHATROOMS_FOR_USER, variables: { userId } }], // Cambia '1' por el ID del usuario actual
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
