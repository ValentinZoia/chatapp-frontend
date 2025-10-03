"use client";

import type React from "react";
import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { useGeneralStore } from "@/stores/generalStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const userId = useUserStore((state) => state);
  console.log(userId);
  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);

  useEffect(() => {
    if (!userId.id) {
      toggleLoginModal();
    }
  }, [userId, toggleLoginModal]);

  return <>{children}</>;
}
