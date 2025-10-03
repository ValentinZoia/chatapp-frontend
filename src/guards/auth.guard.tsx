"use client";

import type React from "react";

import { useEffect } from "react";
// import { useLocation } from "react-router-dom"
import { useUserStore } from "@/stores/userStore";
import { useGeneralStore } from "@/stores/generalStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const userId = useUserStore((state) => state);
  console.log(userId);
  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);
  // const location = useLocation()

  useEffect(() => {
    if (!userId.id) {
      console.log("habrete sesamo");
      toggleLoginModal();
      console.log("deberia haberse ejecutado");
    }
  }, [userId, toggleLoginModal]);

  return <>{children}</>;
}
