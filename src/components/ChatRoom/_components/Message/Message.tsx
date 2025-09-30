import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface IMessage {
  id: string;
  username: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
}

function Message({ msg }: { msg: IMessage }) {
  return (
    <>
      <Avatar className="h-9 w-9 shrink-0">
        <AvatarFallback
          className={
            msg.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
          }
        >
          {msg.username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div
        className={`flex flex-col gap-1 ${
          msg.isOwn ? "items-end" : "items-start"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {msg.username}
          </span>
          <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
        </div>
        <div
          className={`rounded-lg px-4 py-2 ${
            msg.isOwn
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          <p className="text-sm">{msg.message}</p>
        </div>
      </div>
    </>
  );
}
export default Message;
