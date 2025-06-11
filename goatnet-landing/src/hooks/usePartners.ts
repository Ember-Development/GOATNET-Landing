import { useState, useEffect } from "react";

export interface PartnerItem {
  id: string;
  name: string;
  imageUrl: string;
  link: string | null;
  order: number | null;
}

const API_URL = import.meta.env.VITE_API_URL;

export function usePartners() {
  const [data, setData] = useState<PartnerItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPartners() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/partners`);
        if (!res.ok) {
          throw new Error(
            `Failed to load partners: ${res.status} ${res.statusText}`
          );
        }
        const json: PartnerItem[] = await res.json();

        if (!cancelled) {
          setData(json);
        }
      } catch (err: any) {
        console.error("usePartners fetch error:", err);
        if (!cancelled) {
          setError(err.message || "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPartners();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    console.log({ loading, error, data });
  }, [loading, error, data]);

  return { data, loading, error };
}
