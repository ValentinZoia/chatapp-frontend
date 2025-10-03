import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "../Message";
import { useEffect, useRef } from "react";

import type { IMessage } from "@/data/Chatrooms/useGetMessagesForChatroom";

interface ChatAreaProps {
  messages: IMessage[];
  currentUserId: number;
}

function ChatArea({ messages, currentUserId }: ChatAreaProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  console.log(currentUserId);
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
      <div className="space-y-4">
        {messages && messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg?.id}
              className={`flex gap-3 ${
                msg?.user?.id === currentUserId
                  ? "flex-row-reverse"
                  : "flex-row"
              }`}
            >
              <Message msg={msg} isOwn={msg?.user?.id === currentUserId} />
            </div>
          ))
        ) : (
          <>
            <p>No hay mensajes Todavia. Se el primero en enviar uno!</p>
          </>
        )}
      </div>
    </ScrollArea>
  );
}
export default ChatArea;
