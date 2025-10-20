import { useMessagesMutations } from "@/data/Chatrooms/useMessagesMutations";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export function useMessageSender(chatroomId: number, userId: number) {
  const [messageContent, setMessageContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { sendMessage } = useMessagesMutations(userId);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedFile(file);
      }
    },
  });

  const previewUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;

  const handleSendMessage = async () => {
    if (!messageContent.trim() && !selectedFile) return;

    try {
      await sendMessage({
        chatroomId,
        content: messageContent,
        image: selectedFile,
      });
      setMessageContent("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return {
    messageContent,
    setMessageContent,
    selectedFile,
    setSelectedFile,
    previewUrl,
    getRootProps,
    getInputProps,
    handleSendMessage,
  };
}
