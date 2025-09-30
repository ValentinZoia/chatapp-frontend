import { BadgeUsersActives } from "@/components/BadgeUsersActives";
import type { IRoom } from "@/components/Sidebar/_components/ItemRoomList/ItemRoomList";
import { CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

function RoomCardContent({ room }: { room: IRoom }) {
  return (
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{room.members}</span>
          </div>
          <BadgeUsersActives usersAvtives={room.active} />
        </div>
      </div>
    </CardContent>
  );
}
export default RoomCardContent;
