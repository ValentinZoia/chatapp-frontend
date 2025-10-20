import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "../Message";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatAreaMessages } from "@/hooks/useChatAreaMessages";
import { useScrollAreaAndSound } from "@/hooks/useScrollArea";
import { useState } from "react";

interface ChatAreaProps {
  currentUserId: number;
  // messagesLoading?: boolean;
}

function ChatArea({
  // messages,
  currentUserId,
}: // hasMore,
// loadMoreMessages,
// messagesLoading,
ChatAreaProps) {
  const { messages, hasMore, loadMoreMessages, messagesLoading } =
    useChatAreaMessages();
  const { messagesEndRef, scrollAreaRef, setShouldScrollToBottom } =
    useScrollAreaAndSound({
      messages,
      currentUserId,
    });
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Handler para cargar más mensajes
  const handleLoadMore = async () => {
    if (isLoadingMore) return;
    console.log("cargando mas...");
    // Guardar posición actual del scroll antes de cargar
    const scrollContainer = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    const scrollHeightBefore = scrollContainer?.scrollHeight || 0;

    setIsLoadingMore(true);
    setShouldScrollToBottom(false);

    try {
      await loadMoreMessages();

      // Después de cargar, ajustar el scroll para mantener la posición visual
      setTimeout(() => {
        if (scrollContainer) {
          const scrollHeightAfter = scrollContainer.scrollHeight;
          const heightDifference = scrollHeightAfter - scrollHeightBefore;
          scrollContainer.scrollTop = heightDifference;
        }
      }, 100);
    } catch (error) {
      console.error("Error loading more messages:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <ScrollArea className="flex-1 overflow-auto" ref={scrollAreaRef}>
      <div className="py-4 px-2 space-y-4">
        {/* Botón de cargar más */}
        {hasMore && messages.length > 0 && (
          <div className="flex justify-center mb-4">
            <Button
              onClick={handleLoadMore}
              disabled={isLoadingMore || messagesLoading}
              variant="outline"
              size="sm"
            >
              {messagesLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cargando...
                </>
              ) : (
                "Cargar mensajes anteriores"
              )}
            </Button>
          </div>
        )}

        {/* Mensajes */}
        {messages && messages.length > 0 ? (
          <>
            {messages.map((msg) => (
              <div
                key={msg?.node?.id}
                className={`flex gap-3 ${
                  msg?.node?.user?.id === currentUserId
                    ? "flex-row-reverse"
                    : "flex-row"
                }`}
              >
                <Message
                  msg={msg}
                  isOwn={msg?.node?.user?.id === currentUserId}
                />
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <p className="flex justify-center text-md text-muted-foreground">
            No hay mensajes todavía. ¡Sé el primero en enviar uno!
          </p>
        )}
      </div>
    </ScrollArea>
  );
}
export default ChatArea;
