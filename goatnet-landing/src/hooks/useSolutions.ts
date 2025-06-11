import { useState, useEffect } from "react";

export interface ApiSolutionItemFromServer {
  id: number;
  title: string;
  tag: string;
  description: string;
  tabId: number;
}

export interface TabObjectFromServer {
  id: number;
  name: string; // e.g. "Storytelling"
  tagline: string; // e.g. "Share your why & celebrate others…"
  items: ApiSolutionItemFromServer[];
}

const API_URL = import.meta.env.VITE_API_URL;

export function useSolutions() {
  const [data, setData] = useState<TabObjectFromServer[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchSolutions() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/solutions`);
        if (!res.ok) {
          throw new Error(
            `Failed to load solutions: ${res.status} ${res.statusText}`
          );
        }
        const json: TabObjectFromServer[] = await res.json();
        console.log("useSolutions fetched JSON:", json);

        if (!cancelled) {
          setData(json);
        }
      } catch (err: any) {
        console.error("useSolutions fetch error:", err);
        if (!cancelled) {
          setError(err.message || "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchSolutions();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
