import { BadgeUsersActives } from "@/components/BadgeUsersActives";
import { CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface Props {
  totalMembers: number;
  chatroomId: number;
}

function RoomCardContent({ totalMembers, chatroomId }: Props) {
  return (
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{totalMembers}</span>
          </div>
          <BadgeUsersActives chatroomId={chatroomId} />
        </div>
      </div>
    </CardContent>
  );
}
export default RoomCardContent;
