import { z } from "zod";

export const updateProfileSchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters"),
  file: z.file().optional().nullable(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export const defaultValues: UpdateProfileFormData = {
  fullname: "",
  file: null,
};
