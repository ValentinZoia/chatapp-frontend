import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChatArea,
  ChatRoomHeader,
  InputMessage,
} from "@/components/ChatRoom/_components";

import { useChatroom } from "@/hooks/useChatroom";

// import { Suspense } from "react";
import { useUserStore } from "@/stores/userStore";
import { DocumentHead } from "@/components/DocumentHead";

function ChatRoomContent() {
  const { roomId } = useParams<{ roomId: string }>();
  if (!roomId) {
    throw new Response("Invalid room ID", { status: 400 });
  }
  const chatroomId = parseInt(roomId!);
  const userId = useUserStore((state) => state.id);

  const { infoChatroom, liveUsersLoading, isUserPartOfChatroom } = useChatroom({
    chatroomId,
    userId: userId,
  });

  if (liveUsersLoading || !isUserPartOfChatroom) {
    return null;
  }

  if (!chatroomId || !userId || !infoChatroom || !infoChatroom.id || !infoChatroom.name) {
    return (


      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Sala no encontrada
          </h2>
          <p className="mt-2 text-muted-foreground">
            La sala que buscás no existe
          </p>
          <Link to="/">
            <Button className="mt-4">Volver al inicio</Button>
          </Link>
        </div>
      </div>

    );
  }

  return (

    <>
      <article>

        <DocumentHead
          title={infoChatroom.name}
          description={infoChatroom.description || `Chatroom de ${infoChatroom.name} en Futbol Chat`}
        />
      </article>
      <div className="flex h-screen flex-col overflow-y-hidden">
        {/* Room Header */}
        <ChatRoomHeader roomInfo={infoChatroom} userId={userId} />

        {/* Chat Area of Messages */}
        <ChatArea currentUserId={userId} />


        {/* Message Input */}
        <InputMessage chatroomId={chatroomId} userId={userId} />
      </div>
    </>
  );
}

export default ChatRoomContent;
