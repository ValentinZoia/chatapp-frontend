import type {
  UserStartedTypingSubscription,
  UserStoppedTypingSubscription,
  NewMessageSubscription,
} from "@/gql/graphql";
import {
  USER_STARTED_TYPING_SUBSCRIPTION,
  USER_STOPPED_TYPING_SUBSCRIPTION,
  NEW_MESSAGE_SUBSCRIPTION,
} from "@/graphql/subscriptions";
import { useSubscription } from "@apollo/client/react";

interface UseTypingSubscriptionsProps {
  chatroomId: string | number;
  userId?: number;
}

export function useMessagesSubscriptions({
  chatroomId,
  userId,
}: UseTypingSubscriptionsProps) {
  // normalizamos id a number
  const parsedChatroomId =
    typeof chatroomId === "string" ? parseInt(chatroomId) : chatroomId;

  //new Message
  const {
    data: newMessageData,
    loading: newMessageLoading,
    error: newMessageError,
  } = useSubscription<NewMessageSubscription>(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { chatroomId: parsedChatroomId },
  });

  // started typing
  const {
    data: startedTypingData,
    loading: startedTypingLoading,
    error: startedTypingError,
  } = useSubscription<UserStartedTypingSubscription>(
    USER_STARTED_TYPING_SUBSCRIPTION,
    {
      variables: { chatroomId: parsedChatroomId, userId },
    }
  );

  // stopped typing
  const {
    data: stoppedTypingData,
    loading: stoppedTypingLoading,
    error: stoppedTypingError,
  } = useSubscription<UserStoppedTypingSubscription>(
    USER_STOPPED_TYPING_SUBSCRIPTION,
    {
      variables: { chatroomId: parsedChatroomId, userId },
    }
  );

  return {
    // new message
    newMessageData,
    newMessageLoading,
    newMessageError,

    // started typing
    startedTypingData,
    startedTypingLoading,
    startedTypingError,

    // stopped typing
    stoppedTypingData,
    stoppedTypingLoading,
    stoppedTypingError,
  };
}
