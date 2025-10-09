import { BadgeUsersActives } from "@/components/BadgeUsersActives";
// import type { IRoom } from "@/components/Sidebar/_components/ItemRoomList/ItemRoomList";
import { Button } from "@/components/ui/button";
import type { GetUsersOfChatroomQuery } from "@/gql/graphql";
import { ArrowLeft, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { UserAvatarGroup } from "../UserAvatarGroup";
import { Field } from "@/components/Home/_components/RoomCard/_components";
import { useUserStore } from "@/stores/userStore";
import { SettingsPopover } from "../SettingsPopover";
import { useGeneralStore } from "@/stores/generalStore";
import { DialogDeleteChatroom } from "../DialogDeleteChatroom";
import { DialogAddMembers } from "../DialogAddMembers";
// import { Image } from "@/components/Image";
function ChatRoomHeader({
  roomInfo,
}: {
  roomInfo: GetUsersOfChatroomQuery["getChatroomById"] | undefined;
}) {
  const userId = useUserStore((state) => state.id);
  const isDeleteChatroomDialogOpen = useGeneralStore(
    (state) => state.isDeleteChatroomDialogOpen
  );
  const isAddMembersDialogOpen = useGeneralStore(
    (state) => state.isAddUsersToChatroomDialogOpen
  );
  const toogleDeleteChatroomDialog = useGeneralStore(
    (state) => state.toggleDeleteChatroomDialog
  );
  const toogleAddMembersDialog = useGeneralStore(
    (state) => state.toggleAddUsersToChatroomDialog
  );
  const chatroomId = roomInfo?.id as number;
  const isAdmin = userId === roomInfo?.adminId;
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row items-start md:items-center md:justify-between border-b border-border bg-card px-6 py-4">
        {/* Flecha, Logo e info de la sala */}
        <div className="w-full md:w-fit flex items-center justify-between gap-8">
          <div className="flex items-center gap-4 ">
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

          {isAdmin && <SettingsPopover chatroomId={roomInfo?.id as number} />}
        </div>
        <div className="self-center flex gap-8 items-center">
          {/* Usuarios del grupo -  en el caso de que sea Privada        */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="flex gap-1 text-sm text-muted-foreground">
                {roomInfo?.users?.length}{" "}
                <span className="hidden md:block">miembros</span>
              </span>
            </div>
            <div className="h-4 w-px bg-border" />
            <UserAvatarGroup users={roomInfo?.users || []} maxDisplay={5} />
          </div>

          {/* Usuarios online */}
          <BadgeUsersActives chatroomId={roomInfo?.id || 0} />
        </div>
      </div>

      <DialogAddMembers
        chatroomId={chatroomId}
        open={isAddMembersDialogOpen}
        onClose={toogleAddMembersDialog}
      />
      <DialogDeleteChatroom
        chatroomId={chatroomId}
        open={isDeleteChatroomDialogOpen}
        onClose={toogleDeleteChatroomDialog}
      />
    </>
  );
}
export default ChatRoomHeader;
