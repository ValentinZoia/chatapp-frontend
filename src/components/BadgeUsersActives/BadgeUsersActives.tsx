"use no memo";
import { useLiveUsersSubscriptions } from "@/data/Chatrooms/useLiveUsersSubscriptions";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
function BadgeUsersActives({ chatroomId }: { chatroomId: number }) {

  const { liveUsersData, liveUsersLoading } =
    useLiveUsersSubscriptions(chatroomId);

  const userCount = liveUsersData?.liveUsersInChatroom?.length ?? 0;
  const hasUsers = userCount > 0;

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5",
        hasUsers
          ? "border-green-500/20 bg-green-500/10 text-green-500"
          : "border-muted-foreground/20 bg-muted-foreground/10 text-muted-foreground"
      )}
    >
      <div
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          hasUsers ? "bg-green-500" : "bg-green-500/50"
        )}
      />
      {liveUsersLoading || !hasUsers ? (
        <span className="text-xs text-muted-foreground">Nadie conectado</span>
      ) : (
        <span>{userCount} en línea</span>
      )}
    </Badge>
  );
}

export default BadgeUsersActives;
