import { UPDATE_USER_PROFILE } from "@/graphql/mutations";

import type {
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables,
} from "@/gql/graphql";

import { useMutation } from "@apollo/client/react";

export function useUpdateUserProfileMutations() {
  // Update user Prodile
  const [updateUserProfileMutation, { loading, error, data }] = useMutation<
    UpdateUserProfileMutation,
    UpdateUserProfileMutationVariables
  >(UPDATE_USER_PROFILE);

  const updateUserProfile = (input: UpdateUserProfileMutationVariables) => {
    return updateUserProfileMutation({ variables: input });
  };

  return {
    updateUserProfile,
    loading,
    error,
    data,
  };
}
