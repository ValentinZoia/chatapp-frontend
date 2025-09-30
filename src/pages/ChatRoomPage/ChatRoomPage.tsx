import { Link, useLoaderData } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROOM_INFO } from "@/data/room-info";
import {
  ChatArea,
  ChatRoomHeader,
  InputMessage,
} from "@/components/ChatRoom/_components";

function ChatRoomPage() {
  const { roomId } = useLoaderData() as {
    roomId: string;
  };
  if (!roomId) {
    throw new Response("Invalid room ID", { status: 400 });
  }
  console.log(roomId);
  const roomInfo = roomId ? ROOM_INFO[roomId] : null;
  if (!roomInfo) {
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
    <div className="flex h-full flex-col">
      {/* Room Header */}
      <ChatRoomHeader roomInfo={roomInfo} />

      {/* Chat Messages */}
      <ChatArea />

      {/* Message Input */}
      <InputMessage />
    </div>
  );
}
export default ChatRoomPage;
