import { Suspense } from "react";
import { ChatRoomContent, ChatRoomSkeleton } from "./_components";


function ChatRoomPage() {
  return (
    <Suspense fallback={<ChatRoomSkeleton />}>
      <ChatRoomContent />
    </Suspense>
  );
}

export default ChatRoomPage;
