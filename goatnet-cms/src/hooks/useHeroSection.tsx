import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { HeroSection } from "../types";
import { heroApi, uploadVideoAndGetUrl } from "../utils/api";

export function useHeroSection() {
  const [hero, setHero] = useState<HeroSection | null>(null);

  const [desktopUrl, setDesktopUrl] = useState("");
  const [mobileUrl, setMobileUrl] = useState("");

  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);

  const [originalDesktopUrl, setOriginalDesktopUrl] = useState("");
  const [originalMobileUrl, setOriginalMobileUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch the current HeroSection on mount
  useEffect(() => {
    async function fetchHero() {
      setLoading(true);
      try {
        const data = await heroApi.fetchHero();
        setHero(data);

        setOriginalDesktopUrl(data.desktopVideoUrl);
        setOriginalMobileUrl(data.mobileVideoUrl);
        setDesktopUrl(data.desktopVideoUrl);
        setMobileUrl(data.mobileVideoUrl);
      } catch (err: any) {
        toast.error("Unable to load Hero section: " + err.message, {
          duration: 4000,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchHero();
  }, []);

  // Save handler: upload any chosen File first, then PATCH both desktop & mobile URLs
  const saveChanges = async () => {
    if (!hero) return;

    setSaving(true);
    try {
      let finalDesktopUrl = desktopUrl.trim();
      if (desktopFile) {
        finalDesktopUrl = await uploadVideoAndGetUrl(desktopFile);
      }

      let finalMobileUrl = mobileUrl.trim();
      if (mobileFile) {
        finalMobileUrl = await uploadVideoAndGetUrl(mobileFile);
      }

      const updatedHero = await heroApi.updateHero({
        desktopVideoUrl: finalDesktopUrl,
        mobileVideoUrl: finalMobileUrl,
      });

      setHero(updatedHero);
      setOriginalDesktopUrl(updatedHero.desktopVideoUrl);
      setOriginalMobileUrl(updatedHero.mobileVideoUrl);
      setDesktopUrl(updatedHero.desktopVideoUrl);
      setMobileUrl(updatedHero.mobileVideoUrl);

      setDesktopFile(null);
      setMobileFile(null);

      toast.success("Hero section updated!", { duration: 3000 });
    } catch (err: any) {
      toast.error("Error updating Hero: " + err.message, { duration: 4000 });
    } finally {
      setSaving(false);
    }
  };

  return {
    hero,

    desktopUrl,
    setDesktopUrl,
    mobileUrl,
    setMobileUrl,
    desktopFile,
    setDesktopFile,
    mobileFile,
    setMobileFile,

    originalDesktopUrl,
    originalMobileUrl,

    loading,
    saving,
    saveChanges,
  };
}
