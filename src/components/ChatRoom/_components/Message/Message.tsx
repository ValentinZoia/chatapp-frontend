import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { IMessage } from "@/data/Chatrooms/useGetMessagesForChatroom";
import { formatTime } from "@/lib/utils";

interface Props {
  msg: IMessage | null | undefined;
  isOwn: boolean;
}

function Message({ msg, isOwn }: Props) {
  if (!msg || (!msg.node.content && !msg.node.imageUrl)) return null;
  return (
    <>
      <Avatar className="h-9 w-9 shrink-0">
        <AvatarImage
          src={msg.node.user?.avatarUrl || "/placeholder.svg"}
          alt={msg.node.user?.fullname}
        />
        <AvatarFallback
          className={isOwn ? "bg-primary text-primary-foreground" : "bg-muted"}
        >
          {msg.node.user?.fullname.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div
        className={`flex flex-col gap-1 ${isOwn ? "items-end" : "items-start"}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {msg.node.user?.fullname}
          </span>
          <span className="text-xs text-muted-foreground">
            {msg.node.createdAt
              ? formatTime(msg.node.createdAt)
              : formatTime(new Date())}
          </span>
        </div>
        <div
          className={`rounded-lg  max-w-[80vw] sm:max-w-[60vw] break-words whitespace-pre-line ${isOwn
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
            }`}
        >
          {msg.node.content && (


            <p className="text-sm break-words whitespace-pre-line px-4  py-2">
              {msg.node.content}
            </p>
          )
          }
          {msg.node.imageUrl && (
            <img
              src={msg.node.imageUrl}
              alt="Adjunto"
              className="max-h-60 w-auto rounded p-1"
            />
          )}
        </div>
      </div>
    </>
  );
}
export default Message;
