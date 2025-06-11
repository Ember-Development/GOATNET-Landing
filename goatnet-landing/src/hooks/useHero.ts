import { useState, useEffect } from "react";

export interface HeroSection {
  id: number;
  desktopVideoUrl: string;
  mobileVideoUrl: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export function useHeroSection() {
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHero() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/hero`);
        if (!res.ok) {
          throw new Error("Failed to fetch hero");
        }
        const data: HeroSection = await res.json();
        console.log(data);
        setHero(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchHero();
  }, []);

  return { hero, loading, error };
}
