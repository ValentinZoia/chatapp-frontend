import type { IMessage } from "@/data/Chatrooms/useGetMessagesForChatroom";
import { useEffect, useRef, useState } from "react";



/*
Hook para manejar la logica del area de scroll y sonido de nuevos mensajes. En la zona del chat.
La idea es que cuando apenas se monte el componente o cuando lleguen nuevos mensajes, el area de scroll baje automaticamente al final, y que suene un sonido si el mensaje no es del usuario actual.
*/
export function useScrollAreaAndSound({
  messages,
  currentUserId,
}: {
  messages: IMessage[];
  currentUserId: number;
}) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const prevMessagesLength = useRef<number>(messages.length);

  const playSound = () => {
    const audio = new Audio("/sounds/new-message.mp3");
    audio.play();
  };

  // Scroll automático al fondo
  useEffect(() => {
    if (shouldScrollToBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, shouldScrollToBottom]);

  // Sonido al recibir nuevo mensaje
  useEffect(() => {
    if (
      messages.length > prevMessagesLength.current &&
      !(messages[messages.length - 1]?.node.user?.id === currentUserId)
    ) {
      // Reproducir baudio
      playSound();
    }
    prevMessagesLength.current = messages.length;
  }, [messages, currentUserId]);

  return { scrollAreaRef, messagesEndRef, setShouldScrollToBottom };
}
