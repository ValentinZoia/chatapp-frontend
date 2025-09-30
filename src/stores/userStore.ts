import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { type UserEntity as User } from "../gql/graphql";

interface User {
  id: number;
  avatarUrl: string | null;
  fullname: string;
  email: string;
}

interface UserState {
  id: number | undefined;
  avatarUrl: string | null;
  fullname: string;
  email?: string;
  updateProfileImage: (image: string) => void;
  updateUsername: (name: string) => void;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: undefined,
      avatarUrl: null,
      fullname: "",
      email: "",
      updateProfileImage: (image: string) => set({ avatarUrl: image }),
      updateUsername: (name: string) => set({ fullname: name }),
      setUser: (user: User) =>
        set({
          id: user.id,
          avatarUrl: user.avatarUrl,
          fullname: user.fullname,
          email: user.email,
        }),
    }),
    {
      name: "user-storage",
    }
  )
);
