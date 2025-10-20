import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const defaultValues: LoginFormData = {
  email: "",
  password: "",
};
