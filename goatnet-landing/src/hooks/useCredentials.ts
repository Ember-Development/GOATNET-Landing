import { useState, useEffect } from "react";

export interface Credential {
  id: string;
  name: string | null;
  imageUrl: string | null;
  link: string | null;
  showOnLanding: boolean;
  landingOrder: number | null;
}

const API_URL = import.meta.env.VITE_API_URL;

export function useCredentials() {
  const [data, setData] = useState<Credential[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchCredentials() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/credential/credentials`);
        if (!res.ok) {
          throw new Error(
            `Failed to load credentials: ${res.status} ${res.statusText}`
          );
        }
        const json: Credential[] = await res.json();

        if (!cancelled) {
          setData(json);
        }
      } catch (err: any) {
        console.error("useCredentials fetch error:", err);
        if (!cancelled) {
          setError(err.message || "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchCredentials();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    console.log({ loading, error, data });
  }, [loading, error, data]);

  return { data, loading, error };
}
