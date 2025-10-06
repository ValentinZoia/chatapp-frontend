import { z } from "zod";

export const createChatroomSchema = z.object({
  name: z
    .string("Name is required")
    .min(3, "Name must be at least 3 characters"),
  description: z.string().nullable(),
  colorHex: z.string().nullable(),
  image: z.string().nullable(),
});

export type CreateChatroomFormData = z.infer<typeof createChatroomSchema>;

export const defaultValues: CreateChatroomFormData = {
  name: "",
  description: null,
  colorHex: null,
  image: null,
};
