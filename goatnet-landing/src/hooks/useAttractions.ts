import { useState, useEffect } from "react";

export interface AttractionFromServer {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  type: string | null;
  showOnLanding: boolean;
  landingOrder: number | null;
  channels?: { name: string }[];
}

const API_URL = import.meta.env.VITE_API_URL;

export function useAttractions() {
  const [data, setData] = useState<AttractionFromServer[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAttractions() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/showcase`);
        if (!res.ok) {
          throw new Error(
            `Failed to load attractions: ${res.status} ${res.statusText}`
          );
        }
        const json: AttractionFromServer[] = await res.json();

        // Log raw JSON:
        console.log("useAttractions fetched JSON:", json);

        if (!cancelled) {
          setData(json);
        }
      } catch (err: any) {
        console.error("useAttractions fetch error:", err);
        if (!cancelled) {
          setError(err.message || "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchAttractions();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    console.log({ loading, error, data });
  }, [loading, error, data]);

  return { data, loading, error };
}
