import type { AboutSection } from "../types";
const API_URL = import.meta.env.VITE_API_URL;

export const aboutApi = {
  async fetchAbout(): Promise<AboutSection> {
    const res = await fetch(`${API_URL}/about`);
    if (!res.ok) {
      throw new Error("Failed to load AboutSection data");
    }
    return res.json();
  },

  async updateTitle(title: string): Promise<AboutSection> {
    const token = localStorage.getItem("token") ?? "";
    const res = await fetch(`${API_URL}/about/title`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) {
      let msg = "Failed to update title";
      try {
        const err = await res.json();
        msg = err.error || msg;
      } catch {}
      throw new Error(msg);
    }
    return res.json();
  },

  async updateYoutubeUrl(youtubeUrl: string): Promise<AboutSection> {
    const token = localStorage.getItem("token") ?? "";
    const res = await fetch(`${API_URL}/about/youtubeUrl`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ youtubeUrl }),
    });
    if (!res.ok) {
      let msg = "Failed to update YouTube URL";
      try {
        const err = await res.json();
        msg = err.error || msg;
      } catch {}
      throw new Error(msg);
    }
    return res.json();
  },

  async addParagraph(text: string): Promise<AboutSection> {
    const token = localStorage.getItem("token") ?? "";
    const res = await fetch(`${API_URL}/about/paragraphs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) {
      let msg = "Failed to add paragraph";
      try {
        const err = await res.json();
        msg = err.error || msg;
      } catch {}
      throw new Error(msg);
    }
    return res.json();
  },

  async updateParagraph(index: number, text: string): Promise<AboutSection> {
    const token = localStorage.getItem("token") ?? "";
    const res = await fetch(`${API_URL}/about/paragraphs/${index}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) {
      let msg = "Failed to update paragraph";
      try {
        const err = await res.json();
        msg = err.error || msg;
      } catch {}
      throw new Error(msg);
    }
    return res.json();
  },

  async deleteParagraph(index: number): Promise<AboutSection> {
    const token = localStorage.getItem("token") ?? "";
    const res = await fetch(`${API_URL}/about/paragraphs/${index}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!res.ok) {
      let msg = "Failed to delete paragraph";
      try {
        const err = await res.json();
        msg = err.error || msg;
      } catch {}
      throw new Error(msg);
    }
    return res.json();
  },
};
