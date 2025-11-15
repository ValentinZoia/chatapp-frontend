
import { useParams } from "react-router-dom";
import {
  ChatArea,
  ChatRoomHeader,
  InputMessage,
} from "@/components/ChatRoom/_components";
import { useUserStore } from "@/stores/userStore";
import { Suspense } from "react";
import { ChatRoomSkeleton } from "../ChatRoomSkeleton";


function ChatRoomContent() {
  const { roomId } = useParams<{ roomId: string }>();
  if (!roomId) {
    throw new Response("Invalid room ID", { status: 400 });
  }
  const chatroomId = parseInt(roomId!);
  const userId = useUserStore((state) => state.id);




  if (!chatroomId || !userId) {
    throw new Error("Sala no encontrada");

  }

  return (

    <>

      <div className="flex h-screen flex-col overflow-y-hidden">
        {/* Room Header */}

        <Suspense fallback={<ChatRoomSkeleton />}>

          <ChatRoomHeader chatroomId={chatroomId} userId={userId} />
        </Suspense>


        {/* Chat Area of Messages */}


        <ChatArea currentUserId={userId} />



        {/* Message Input */}
        <InputMessage chatroomId={chatroomId} userId={userId} />
      </div>
    </>
  );
}

export default ChatRoomContent;
