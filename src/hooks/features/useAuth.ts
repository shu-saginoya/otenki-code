"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { createClient } from "@/lib/supabase/client";

import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);
      setLoading(false);
    };

    checkAuth();
  }, [router, supabase]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return {
    user,
    loading,
    logout,
  };
}
