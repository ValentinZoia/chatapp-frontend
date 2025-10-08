import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { IMessage } from "@/data/Chatrooms/useGetMessagesForChatroom";
import { formatTime } from "@/lib/utils";

interface Props {
  msg: IMessage | null | undefined;
  isOwn: boolean;
}

function Message({ msg, isOwn }: Props) {
  if (!msg) return null;
  return (
    <>
      <Avatar className="h-9 w-9 shrink-0">
        <AvatarFallback
          className={isOwn ? "bg-primary text-primary-foreground" : "bg-muted"}
        >
          {msg.user?.fullname.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div
        className={`flex flex-col gap-1 ${isOwn ? "items-end" : "items-start"}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {msg.user?.fullname}
          </span>
          <span className="text-xs text-muted-foreground">
            {msg.createdAt ? formatTime(msg.createdAt) : formatTime(new Date())}
          </span>
        </div>
        <div
          className={`rounded-lg px-4 py-2 max-w-[80vw] sm:max-w-[60vw] break-words whitespace-pre-line ${
            isOwn
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          <p className="text-sm break-words whitespace-pre-line">
            {msg.content}
          </p>
        </div>
      </div>
    </>
  );
}
export default Message;
