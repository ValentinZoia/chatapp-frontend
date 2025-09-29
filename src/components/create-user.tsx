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
} from "./ui/form";
import { Input, InputPassword } from "./ui/input";
import { SubmitBtn } from "./SubmitBtn";
import { useMutation } from "@apollo/client/react";
import { REGISTER_USER } from "@/graphql/mutations/Register";

function CreateUser() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValues,
  });

  const [register, { loading, error }] = useMutation(REGISTER_USER);

  if (error) {
    console.error(error);
  }

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register({
        variables: {
          registerInput: data,
        },
      });
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
export default CreateUser;
