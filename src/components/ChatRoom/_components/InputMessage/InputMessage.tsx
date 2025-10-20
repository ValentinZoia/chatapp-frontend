import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
import { TypingIndicator } from "../TypingIndicator";
import { Send, Image } from "lucide-react";
import { useMessageSender } from "@/hooks/useMessageSender";
import { useTypingIndicator } from "@/hooks/useTypingIndicator";
// import { useEffect } from "react";

interface InputMessageProps {
  chatroomId: number;
  userId: number | undefined;
}

function InputMessage({ chatroomId, userId }: InputMessageProps) {
  const {
    messageContent,
    setMessageContent,
    selectedFile,
    previewUrl,
    getRootProps,
    getInputProps,
    handleSendMessage,
  } = useMessageSender(chatroomId, userId || 0);

  const { typingUsers, handleUserStartedTyping } =
    useTypingIndicator(chatroomId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <div className="border-t border-border bg-card p-4">
      {/* <Separator /> */}
      <div className="relative p-4">
        <TypingIndicator typingUsers={typingUsers} />

        <div className="flex items-center gap-2 w-full">
          <div {...getRootProps()} className="flex items-center">
            <input {...getInputProps()} />
            {selectedFile && previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-12 h-12 rounded-md object-cover mr-2"
              />
            )}
            <Button variant="outline" size="icon" type="button">
              <Image className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
            <Input
              placeholder="Escribí tu mensaje..."
              onKeyDown={handleUserStartedTyping}
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              className="flex-1 bg-background"
            />
            <Button type="submit" size="icon" className="h-10 w-10 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default InputMessage;
