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
import { useUserStore } from "@/stores/userStore";

export type IRoom = CreateChatroomMutation["createChatroom"];


// Hook para manejar la creacion de una nueva chatroom. importa la mutación, crea sus tipos, formulario, estado de carga, etc.
export function useCreateChatroom() {
  const [newlyCreatedChatroom, setNewlyCreatedChatroom] = useState<
    CreateChatroomMutation["createChatroom"] | null
  >(null);
  const userId = useUserStore((state) => state.id);
  const { createChatroom, createChatroomLoading: loading } =
    useChatroomMutations(userId);

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
