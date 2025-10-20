import { useState, useEffect, useRef } from "react";
import { useUserStore } from "@/stores/userStore";
import { type UserEntity } from "@/gql/graphql";
import { useMessagesSubscriptions } from "@/data/Chatrooms/useMessagesSubscriptions";
import { useMessagesMutations } from "@/data/Chatrooms/useMessagesMutations";

export function useTypingIndicator(chatroomId: number) {
  const userId = useUserStore((state) => state.id);
  const [typingUsers, setTypingUsers] = useState<UserEntity[]>([]);
  const typingTimeoutsRef = useRef<{ [key: number]: NodeJS.Timeout }>({});

  const { startedTypingData, stoppedTypingData } = useMessagesSubscriptions({
    chatroomId,
    userId,
  });

  const {
    startedTyping: userStartedTypingMutation,
    stoppedTyping: userStoppedTypingMutation,
  } = useMessagesMutations();

  useEffect(() => {
    const user = startedTypingData?.userStartedTyping;
    if (user?.id) {
      setTypingUsers((prev) => {
        if (!prev.find((u) => u.id === user.id)) {
          return [...prev, user];
        }
        return prev;
      });
    }
  }, [startedTypingData]);

  useEffect(() => {
    const user = stoppedTypingData?.userStoppedTyping;
    if (user?.id) {
      clearTimeout(typingTimeoutsRef.current[user.id]);
      setTypingUsers((prev) => prev.filter((u) => u.id !== user.id));
    }
  }, [stoppedTypingData]);

  const handleUserStartedTyping = async () => {
    await userStartedTypingMutation({ chatroomId });

    if (userId && typingTimeoutsRef.current[userId]) {
      clearTimeout(typingTimeoutsRef.current[userId]);
    }

    if (userId) {
      typingTimeoutsRef.current[userId] = setTimeout(async () => {
        setTypingUsers((prev) => prev.filter((user) => user.id !== userId));
        await userStoppedTypingMutation({ chatroomId });
      }, 2000);
    }
  };

  return { typingUsers, handleUserStartedTyping };
}
