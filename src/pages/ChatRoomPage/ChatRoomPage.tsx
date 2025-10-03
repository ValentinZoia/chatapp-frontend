import { Suspense } from "react";
import ChatRoomContent from "./ChatRoomContent";
import ChatRoomSkeleton from "./ChatRoomSkeleton";

function ChatRoomPage() {
  return (
    <Suspense fallback={<ChatRoomSkeleton />}>
      <ChatRoomContent />
    </Suspense>
  );
}

export default ChatRoomPage;
