
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
    return (


      <div className="flex flex-col gap-4 h-screen w-full items-center justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg">
          <img
            src="/icon0.svg"
            alt="logo"
            className="aspect-auto object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Sala no encontrada
          </h2>
          <p className="mt-2 text-muted-foreground">
            La sala que buscás no existe o no estas autorizado para verla.
          </p>
          <Link to="/">
            <Button className="cursor-pointer mt-4 bg-blue-400 hover:bg-blue-400/80">Volver al inicio</Button>
          </Link>
        </div>
      </div>

    );
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
