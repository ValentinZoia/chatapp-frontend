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
import { Textarea } from "@/components/ui/textarea";
import type { CreateChatroomFormData } from "@/lib/zod-schemas/createChatroomSchema";

import type { UseFormReturn } from "react-hook-form";

interface CreateRoomFormProps {
  form: UseFormReturn<
    {
      name: string;
      description: string | null;
      colorHex: string | null;
      image: string | null;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    {
      name: string;
      description: string | null;
      colorHex: string | null;
      image: string | null;
    }
  >;
  loading: boolean;
  onSubmit: (data: CreateChatroomFormData) => Promise<void>;
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter chatroom description"
                    {...field}
                    value={field.value ?? ""}
                    disabled={loading}
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="colorHex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={field.value ?? "#3b82f6"}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={loading}
                    className="h-10 w-20 cursor-pointer rounded-md border border-input"
                  />
                  <Input
                    type="text"
                    placeholder="#3b82f6"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      console.log(e.target.value);
                      field.onChange(e.target.value);
                    }}
                    disabled={loading}
                    className="flex-1"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    {...field}
                    value={field.value ?? ""}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitBtn name="Crear Sala" isLoading={loading} />
        </div>
      </form>
    </Form>
  );
}
export default CreateRoomForm;
