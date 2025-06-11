import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { AboutSection } from "../types";
import { aboutApi } from "../utils/aboutApi";

export function useAboutSection() {
  const [about, setAbout] = useState<AboutSection | null>(null);

  // Local form state:
  const [title, setTitle] = useState("");
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // Keep originals so “Clear” can revert a single paragraph:
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalParagraphs, setOriginalParagraphs] = useState<string[]>([]);
  const [originalYoutubeUrl, setOriginalYoutubeUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch entire section on mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await aboutApi.fetchAbout();
        setAbout(data);
        setTitle(data.title);
        setYoutubeUrl(data.youtubeUrl);
        setParagraphs(data.paragraphs.slice());
        setOriginalTitle(data.title);
        setOriginalYoutubeUrl(data.youtubeUrl);
        setOriginalParagraphs(data.paragraphs.slice());
      } catch (err: any) {
        toast.error("Unable to load AboutSection: " + err.message, {
          duration: 4000,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Save title & YouTube URL (PATCH)
  const saveChanges = async () => {
    if (!about) return;
    setSaving(true);
    try {
      let updated = about;

      if (title !== originalTitle) {
        updated = await aboutApi.updateTitle(title);
        setOriginalTitle(updated.title);
      }

      if (youtubeUrl !== originalYoutubeUrl) {
        updated = await aboutApi.updateYoutubeUrl(youtubeUrl);
        setOriginalYoutubeUrl(updated.youtubeUrl);
      }

      setAbout(updated);
      setParagraphs(updated.paragraphs.slice());
      setOriginalParagraphs(updated.paragraphs.slice());

      toast.success("Title & YouTube URL saved!", { duration: 2500 });
    } catch (err: any) {
      toast.error("Error saving changes: " + err.message, {
        duration: 4000,
      });
    } finally {
      setSaving(false);
    }
  };

  // Add a new paragraph (POST)
  const addParagraph = async (text: string) => {
    if (!about) return;
    if (!text.trim()) {
      toast.error("Cannot add an empty paragraph", { duration: 3000 });
      return;
    }
    setSaving(true);
    try {
      const updated = await aboutApi.addParagraph(text.trim());
      setAbout(updated);
      setParagraphs(updated.paragraphs.slice());
      setOriginalParagraphs(updated.paragraphs.slice());
      toast.success("Paragraph added!", { duration: 2000 });
    } catch (err: any) {
      toast.error("Error adding paragraph: " + err.message, {
        duration: 4000,
      });
    } finally {
      setSaving(false);
    }
  };

  //  **Local‐only edit** (no API): update the hook’s paragraphs[] in memory
  const updateParagraphLocally = (index: number, newText: string) => {
    setParagraphs((prev) => {
      const copy = prev.slice();
      copy[index] = newText;
      return copy;
    });
  };

  // Save a single paragraph to the server (PATCH)
  const saveParagraph = async (index: number, newText: string) => {
    if (!about) return;
    if (index < 0 || index >= paragraphs.length) return;

    setSaving(true);
    try {
      const updated = await aboutApi.updateParagraph(index, newText);
      setAbout(updated);
      setParagraphs(updated.paragraphs.slice());
      setOriginalParagraphs(updated.paragraphs.slice());
      toast.success("Paragraph updated!", { duration: 2000 });
    } catch (err: any) {
      toast.error("Error updating paragraph: " + err.message, {
        duration: 4000,
      });
    } finally {
      setSaving(false);
    }
  };

  // Delete a single paragraph (DELETE). Expect the server to return the updated AboutSection:
  const removeParagraph = async (index: number) => {
    if (!about) return;
    if (index < 0 || index >= paragraphs.length) return;

    setSaving(true);
    try {
      const updated = await aboutApi.deleteParagraph(index);
      setAbout(updated);
      setParagraphs(updated.paragraphs.slice());
      setOriginalParagraphs(updated.paragraphs.slice());
      toast.success("Paragraph removed!", { duration: 2000 });
    } catch (err: any) {
      toast.error("Error deleting paragraph: " + err.message, {
        duration: 4000,
      });
    } finally {
      setSaving(false);
    }
  };

  // Revert one paragraph locally back to its original value
  const clearParagraph = (index: number) => {
    setParagraphs((prev) => {
      const copy = prev.slice();
      copy[index] = originalParagraphs[index] ?? "";
      return copy;
    });
  };

  return {
    about,
    loading,
    saving,

    title,
    setTitle,
    youtubeUrl,
    setYoutubeUrl,
    paragraphs,
    originalTitle,
    originalYoutubeUrl,
    originalParagraphs,

    // Local‐only edit
    updateParagraphLocally,
    clearParagraph,

    // API calls
    saveChanges,
    addParagraph,
    saveParagraph,
    removeParagraph,
  };
}
