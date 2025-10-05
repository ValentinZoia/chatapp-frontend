import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChatArea,
  ChatRoomHeader,
  InputMessage,
} from "@/components/ChatRoom/_components";
import { useMessageSender } from "@/hooks/useMessageSender";
import { useChatroom } from "@/hooks/useChatroom";
import { useTypingIndicator } from "@/hooks/useTypingIndicator";

function ChatRoomContent() {
  const {
    infoChatroom,
    chatroomId,
    userId,
    messages,
    liveUsers,
    liveUsersLoading,
    isUserPartOfChatroom,
  } = useChatroom();

  const { typingUsers, handleUserStartedTyping } =
    useTypingIndicator(chatroomId);

  const {
    messageContent,
    setMessageContent,
    selectedFile,
    previewUrl,
    getRootProps,
    getInputProps,
    handleSendMessage,
  } = useMessageSender(chatroomId, userId || 0);

  if (liveUsersLoading || !isUserPartOfChatroom) {
    return null;
  }

  if (!chatroomId) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Sala no encontrada
          </h2>
          <p className="mt-2 text-muted-foreground">
            La sala que buscás no existe
          </p>
          <Link to="/">
            <Button className="mt-4">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Room Header */}
      <ChatRoomHeader liveUsers={liveUsers.length} roomInfo={infoChatroom} />

      {/* Chat Messages */}
      <ChatArea
        messages={messages}
        currentUserId={userId || 0}
        // loading={messagesLoading} // Si tienes loading, pásalo aquí
      />

      {/* Message Input */}
      <InputMessage
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        selectedFile={selectedFile}
        previewUrl={previewUrl}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        handleSendMessage={handleSendMessage}
        handleUserStartedTyping={handleUserStartedTyping}
        typingUsers={typingUsers}
      />
    </div>
  );
}

export default ChatRoomContent;
