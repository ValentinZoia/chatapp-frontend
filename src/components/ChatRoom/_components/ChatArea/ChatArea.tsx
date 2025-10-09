import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "../Message";
import { useEffect, useRef } from "react";

import type { IMessage } from "@/data/Chatrooms/useGetMessagesForChatroom";

interface ChatAreaProps {
  messages: IMessage[];
  currentUserId: number;
}

function ChatArea({ messages, currentUserId }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef<number>(messages.length);

  const playSound = () => {
    const audio = new Audio("/sounds/new-message.mp3");
    audio.play();
  };

  // Scroll automático al fondo
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Sonido al recibir nuevo mensaje
  useEffect(() => {
    if (
      messages.length > prevMessagesLength.current &&
      !(messages[messages.length - 1]?.user?.id === currentUserId)
    ) {
      // Reproducir baudio
      playSound();
    }
    prevMessagesLength.current = messages.length;
  }, [messages, currentUserId]);

  return (
    <ScrollArea className="flex-1 overflow-auto">
      <div className="py-4 px-2 space-y-4">
        {messages && messages.length > 0 ? (
          <>
            {messages.map((msg) => (
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
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <p className="flex justify-center text-md text-muted-foreground">
            No hay mensajes Todavia. Se el primero en enviar uno!
          </p>
        )}
      </div>
    </ScrollArea>
  );
}
export default ChatArea;
