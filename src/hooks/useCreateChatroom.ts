import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useChatroomMutations } from "@/data/Chatrooms/useChatroomsMutations";
import type { CreateChatroomMutation } from "@/gql/graphql";

const chatroomSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
});

export type ChatroomFormData = z.infer<typeof chatroomSchema>;
export type IRoom = CreateChatroomMutation["createChatroom"];
export function useCreateChatroom() {
  const [newlyCreatedChatroom, setNewlyCreatedChatroom] = useState<
    CreateChatroomMutation["createChatroom"] | null
  >(null);

  const { createChatroom, createChatroomLoading: loading } =
    useChatroomMutations();

  const form = useForm<ChatroomFormData>({
    resolver: zodResolver(chatroomSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleCreateChatroom = async (data: ChatroomFormData) => {
    try {
      const response = await createChatroom({
        name: data.name,
      });

      if (response.data?.createChatroom) {
        setNewlyCreatedChatroom(response.data.createChatroom);
        return response.data.createChatroom;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      form.setError("name", {
        message:
          error.graphQLErrors?.[0]?.extensions?.name ||
          "Error creating chatroom",
      });
      throw error;
    }
  };

  const resetChatroom = () => {
    setNewlyCreatedChatroom(null);
    form.reset();
  };

  return {
    form,
    loading,
    newlyCreatedChatroom,
    handleCreateChatroom,
    resetChatroom,
  };
}
