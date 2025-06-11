import { useState, useEffect } from "react";

export interface AboutSection {
  id: number;
  title: string;
  paragraphs: string[];
  youtubeUrl: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export function useAboutSection() {
  const [about, setAbout] = useState<AboutSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAbout() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/about`);
        if (!res.ok) {
          throw new Error("Failed to load About section");
        }
        const data: AboutSection = await res.json();
        console.log(data);
        setAbout(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, []);

  return { about, loading, error };
}
