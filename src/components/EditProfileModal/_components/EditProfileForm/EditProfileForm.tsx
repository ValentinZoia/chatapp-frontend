import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from "@/lib/zod-schemas/updateProfileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitBtn } from "@/components/SubmitBtn";
import { useGeneralStore } from "@/stores/generalStore";
import type { MutationUpdateUserProfileArgs } from "@/gql/graphql";

import { useUserStore } from "@/stores/userStore";
import { useUpdateUserProfileMutations } from "@/data/Users/useUpdateUserProfileMutations";
import { useState } from "react";

function EditProfileForm() {
  const toggleUpdateProfileModal = useGeneralStore(
    (state) => state.toggleProfileSettingsModal
  );
  const actualUsername = useUserStore((state) => state.fullname);

  const updateProfileImage = useUserStore((state) => state.updateProfileImage);
  const updateUsername = useUserStore((state) => state.updateUsername);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullname: actualUsername,
      file: null,
    },
  });

  const { updateUserProfile, loading, error } = useUpdateUserProfileMutations();

  if (error) {
    console.error(error);
  }

  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      const sendData: Partial<MutationUpdateUserProfileArgs> = {
        fullname: data.fullname,
        file: imageFile ? imageFile : undefined,
      };
      const { data: res } = await updateUserProfile(
        sendData as MutationUpdateUserProfileArgs
      );
      if (res?.updateUserProfile) {
        const { fullname, avatarUrl } = res.updateUserProfile;
        if (fullname) updateUsername(fullname);
        if (avatarUrl) updateProfileImage(avatarUrl);
        toggleUpdateProfileModal();
      }
    } catch (error) {
      console.error(error);
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type={"text"}
                  placeholder="New username"
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
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input
                  type={"file"}
                  disabled={loading}
                  {...field}
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    field.onChange(file);
                    setImageFile(file);
                  }}
                  value={undefined}
                  accept="image/*"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitBtn name="Actualizar Perfil" isLoading={loading} />
      </form>
    </Form>
  );
}
export default EditProfileForm;
