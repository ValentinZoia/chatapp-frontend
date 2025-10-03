import {
  defaultValues,
  registerSchema,
  type RegisterFormData,
} from "@/lib/zod-schemas/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input, InputPassword } from "@/components/ui/input";
import { SubmitBtn } from "@/components/SubmitBtn";

import { useAuthMutations } from "@/data/Auth/useAuthMutations";
import type { RegisterResponse } from "@/gql/graphql";
import { useGeneralStore } from "@/stores/generalStore";
import { useUserStore } from "@/stores/userStore";

function RegisterForm() {
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoginOpen = useGeneralStore((state) => state.toggleLoginModal);
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValues,
  });

  const {
    register,
    registerError: error,
    registerLoading: loading,
    registerData,
  } = useAuthMutations();
  if (error) {
    console.error(error);
  }
  console.log(registerData);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { data: res } = await register(data);
      if (res?.register) {
        const { user }: RegisterResponse = res.register;
        setUser({
          id: user?.id as number,
          email: user?.email as string,
          fullname: user?.fullname as string,
          avatarUrl: user?.avatarUrl || null,
        });
        setIsLoginOpen();
        console.log("Register exitoso");
      }
    } catch (err) {
      // Error handled by useMutation
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  type={"text"}
                  placeholder="Full Name"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type={"text"}
                  placeholder="example@me.com..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <InputPassword
                  type="password"
                  placeholder="Password"
                  disabled={loading}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Contraseña</FormLabel>
              <FormControl>
                <InputPassword
                  type="password"
                  placeholder="Confirm Password"
                  disabled={loading}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitBtn name="Crear cuenta" isLoading={loading} />
      </form>
    </Form>
  );
}
export default RegisterForm;
