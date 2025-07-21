/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react";
import { CreateUserDTO } from "@/types/user";

export function useAuth() {
  const [user, setUser] = useState<CreateUserDTO>()
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchAlert = async () => {
      try {

      } catch (e: any) {
        setError(e.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchAlert()
  }, [])

  return { user, error, loading }
}