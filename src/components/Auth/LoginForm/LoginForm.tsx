import {
  defaultValues,
  loginSchema,
  type LoginFormData,
} from "@/lib/zod-schemas/loginSchema";
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
import type { LogInResponse } from "@/gql/graphql";
import { useUserStore } from "@/stores/userStore";
import { useGeneralStore } from "@/stores/generalStore";

function LoginForm() {
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoginOpen = useGeneralStore((state) => state.toggleLoginModal);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultValues,
  });

  const {
    login,
    loginError: error,
    loginLoading: loading,
  } = useAuthMutations();
  if (error) {
    console.error(error);
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { data: res } = await login(data);
      if (res?.login) {
        const { user }: LogInResponse = res.login;
        setUser({
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          avatarUrl: user.avatarUrl || null,
        });
        setIsLoginOpen();
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

        <SubmitBtn name="Iniciar Sesión" isLoading={loading} />
      </form>
    </Form>
  );
}
export default LoginForm;
