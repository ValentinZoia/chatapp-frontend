import { BadgeUsersActives } from "@/components/BadgeUsersActives";
// import type { IRoom } from "@/components/Sidebar/_components/ItemRoomList/ItemRoomList";
import { Button } from "@/components/ui/button";
import type { GetUsersOfChatroomQuery } from "@/gql/graphql";
import { ArrowLeft, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { UserAvatarGroup } from "../UserAvatarGroup";
import { Field } from "@/components/Home/_components/RoomCard/_components";
// import { Image } from "@/components/Image";
function ChatRoomHeader({
  roomInfo,
}: {
  roomInfo: GetUsersOfChatroomQuery["getChatroomById"] | undefined;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      {/* Flecha, Logo e info de la sala */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Field
            room={{
              name: roomInfo?.name,
              colorHex: roomInfo?.colorHex,
              image: roomInfo?.image,
            }}
          />
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {roomInfo?.name || "Chatroom"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {roomInfo?.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        {/* Usuarios del grupo -  en el caso de que sea Privada        */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {roomInfo?.users?.length} miembros
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <UserAvatarGroup users={roomInfo?.users || []} maxDisplay={5} />
        </div>

        {/* Usuarios online */}
        <BadgeUsersActives chatroomId={roomInfo?.id || 0} />
      </div>
    </div>
  );
}
export default ChatRoomHeader;
