import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useChatroomMutations } from "@/data/Chatrooms/useChatroomsMutations";
import type { CreateChatroomMutation } from "@/gql/graphql";
import {
  defaultValues,
  createChatroomSchema,
  type CreateChatroomFormData,
} from "@/lib/zod-schemas/createChatroomSchema";

export type IRoom = CreateChatroomMutation["createChatroom"];
export function useCreateChatroom() {
  const [newlyCreatedChatroom, setNewlyCreatedChatroom] = useState<
    CreateChatroomMutation["createChatroom"] | null
  >(null);

  const { createChatroom, createChatroomLoading: loading } =
    useChatroomMutations();

  const form = useForm<CreateChatroomFormData>({
    resolver: zodResolver(createChatroomSchema),
    defaultValues: defaultValues,
  });

  const handleCreateChatroom = async (data: CreateChatroomFormData) => {
    try {
      const response = await createChatroom(data);

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
