import { SubmitBtn } from "@/components/SubmitBtn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ChatroomFormData } from "@/hooks/useCreateChatroom";
import type { UseFormReturn } from "react-hook-form";

interface CreateRoomFormProps {
  form: UseFormReturn<
    {
      name: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    {
      name: string;
    }
  >;
  loading: boolean;
  onSubmit: (data: ChatroomFormData) => Promise<void>;
}

function CreateRoomForm({ form, loading, onSubmit }: CreateRoomFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chatroom Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter chatroom name"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitBtn name="Crear Room" isLoading={loading} />
        </div>
      </form>
    </Form>
  );
}
export default CreateRoomForm;
