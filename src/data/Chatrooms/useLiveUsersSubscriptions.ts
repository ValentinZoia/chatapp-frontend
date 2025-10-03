import type { LiveUsersInChatroomSubscription } from "@/gql/graphql";
import { LIVE_USERS_SUBSCRIPTION } from "@/graphql/subscriptions";
import { useSubscription } from "@apollo/client/react";

export function useLiveUsersSubscriptions(chatroomId: number | string) {
  const parsedChatroomId =
    typeof chatroomId === "string" ? parseInt(chatroomId) : chatroomId;

  const {
    data: liveUsersData,
    loading: liveUsersLoading,
    error: liveUsersError,
  } = useSubscription<LiveUsersInChatroomSubscription>(
    LIVE_USERS_SUBSCRIPTION,
    {
      variables: {
        chatroomId: parsedChatroomId,
      },
    }
  );

  return {
    liveUsersData,
    liveUsersLoading,
    liveUsersError,
  };
}
