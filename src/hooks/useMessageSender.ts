import { useMessagesMutations } from "@/data/Chatrooms/useMessagesMutations";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export function useMessageSender(chatroomId: number, userId: number) {
  const [messageContent, setMessageContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Mutacion para enviar mensaje.
  const { sendMessage } = useMessagesMutations(userId);

  // Configuracion de react-dropzone para manejar la subida de imagenes.
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedFile(file);
      }
    },
  });

  // Generar una URL de previsualizacion para la imagen seleccionada asi se puede mostrar.
  const previewUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;

  const handleSendMessage = async () => {
    //si no hay contenido ni archivo, no enviar nada.
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
