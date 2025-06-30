import type {
  AboutSection,
  HeroSection,
  SolutionTab,
  SolutionItem,
  Partner,
  Attraction,
  Credential,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/** Helper for any non‐2xx response */
async function handleErrorResponse(res: Response): Promise<never> {
  let errMsg = "Request failed";
  try {
    const errData = await res.json();
    errMsg = errData.error || errMsg;
  } catch {}
  throw new Error(errMsg);
}

export async function uploadImageAndGetUrl(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload/image`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("Image upload failed");
  }
  const json = await res.json();
  if (!json.url) throw new Error("No URL returned from image upload");
  return json.url as string;
}

export async function uploadVideoAndGetUrl(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload/video`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Video upload failed");
  }

  const json = await res.json();
  if (!json.url) {
    throw new Error("No URL returned from video upload");
  }
  return json.url as string;
}

export const heroApi = {
  async fetchHero(): Promise<HeroSection> {
    const res = await fetch(`${API_URL}/hero`);
    if (!res.ok) throw new Error("Failed to load Hero data");
    return res.json();
  },

  async updateHero(data: {
    desktopVideoUrl: string;
    mobileVideoUrl: string;
  }): Promise<HeroSection> {
    const token = localStorage.getItem("token") || "";
    const res = await fetch(`${API_URL}/hero`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) await handleErrorResponse(res);
    return res.json();
  },
};

export const aboutApi = {
  async fetchAbout(): Promise<AboutSection> {
    const res = await fetch(`${API_URL}/about`);
    if (!res.ok) throw new Error("Failed to load About data");
    return res.json();
  },

  async updateAbout(data: {
    title: string;
    paragraphs: string[];
    youtubeUrl: string;
  }): Promise<AboutSection> {
    const token = localStorage.getItem("token") || "";
    const res = await fetch(`${API_URL}/about`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      await handleErrorResponse(res);
    }
    return res.json();
  },
};

export const solutionsApi = {
  async fetchAllTabs(): Promise<SolutionTab[]> {
    const res = await fetch(`${API_URL}/solutions`);
    if (!res.ok) return handleErrorResponse(res);
    return res.json();
  },

  async createTab(data: {
    name: string;
    tagline: string;
  }): Promise<SolutionTab> {
    const token = localStorage.getItem("token") || "";
    const res = await fetch(`${API_URL}/solutions/tabs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ name: data.name, tagline: data.tagline }),
    });
    if (!res.ok) return handleErrorResponse(res);
    return res.json();
  },

  async updateTab(data: {
    id: number;
    name: string;
    tagline: string;
  }): Promise<SolutionTab> {
    const token = localStorage.getItem("token") || "";
    const res = await fetch(`${API_URL}/solutions/tabs/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ name: data.name, tagline: data.tagline }),
    });
    if (!res.ok) return handleErrorResponse(res);
    return res.json();
  },

  async deleteTab(tabId: number): Promise<void> {
    const token = localStorage.getItem("token") || "";
    const res = await fetch(`${API_URL}/solutions/tabs/${tabId}`, {
      method: "DELETE",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    if (!res.ok) return handleErrorResponse(res);
  },

  async createItem(data: {
    tabId: number;
    title: string;
    tag: string;
    description: string;
  }): Promise<SolutionItem> {
    const token = localStorage.getItem("token") || "";
    const res = await fetch(`${API_URL}/solutions/tabs/${data.tabId}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        title: data.title,
        tag: data.tag,
        description: data.description,
      }),
    });
    if (!res.ok) return handleErrorResponse(res);
    return res.json();
  },

  async updateItem(data: {
    itemId: number;
    title: string;
    tag: string;
    description: string;
  }): Promise<SolutionItem> {
    const token = localStorage.getItem("token") || "";
    const res = await fetch(`${API_URL}/solutions/items/${data.itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        title: data.title,
        tag: data.tag,
        description: data.description,
      }),
    });
    if (!res.ok) return handleErrorResponse(res);
    return res.json();
  },

  async deleteItem(itemId: number): Promise<void> {
    const token = localStorage.getItem("token") || "";
    const res = await fetch(`${API_URL}/solutions/items/${itemId}`, {
      method: "DELETE",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    if (!res.ok) return handleErrorResponse(res);
  },
};

export const attractionApi = {
  async fetchShowcase(): Promise<Attraction[]> {
    const res = await fetch(`${API_URL}/showcase`);
    if (!res.ok) return handleErrorResponse(res);
    return res.json();
  },

  async createItem(data: {
    title: string;
    caption: string;
    imageUrl: string;
    videoUrl: string;
    type: string;
    channels: string[];
    showOnLanding: boolean;
    landingOrder?: number;
  }): Promise<Attraction> {
    const token = localStorage.getItem("token") || "";
    const res = await fetch(`${API_URL}/showcase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) return handleErrorResponse(res);
    return res.json();
  },

  async updateItem(
    data: {
      id: string;
    } & Partial<{
      title: string;
      caption: string;
      imageUrl: string;
      videoUrl: string;
      type: string;
      channels: string[];
      showOnLanding: boolean;
      landingOrder: number;
    }>
  ): Promise<Attraction> {
    const token = localStorage.getItem("token") || "";
    const { id, ...updateData } = data;
    const res = await fetch(`${API_URL}/showcase/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(updateData),
    });
    if (!res.ok) return handleErrorResponse(res);
    return res.json();
  },

  async deleteItem(id: string): Promise<void> {
    const token = localStorage.getItem("token") || "";
    const res = await fetch(`${API_URL}/showcase/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!res.ok) return handleErrorResponse(res);
  },
};

export const credentialApi = {
  async fetchAllCredentials(): Promise<Credential[]> {
    const res = await fetch(`${API_URL}/credential/credentials`);
    if (!res.ok) return handleErrorResponse(res);
    return res.json();
  },

  async createCredential(data: {
    name: string;
    link: string;
    landingOrder: number;
    imageField: File | string;
  }): Promise<Credential> {
    const token = localStorage.getItem("token") || "";
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("link", data.link);
    formData.append("landingOrder", data.landingOrder.toString());

    if (data.imageField instanceof File) {
      // upload new file under the “file” key
      formData.append("file", data.imageField);
    } else {
      formData.append("imageUrl", data.imageField);
    }

    const res = await fetch(`${API_URL}/credential/credentials`, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: formData,
    });

    if (!res.ok) return handleErrorResponse(res);
    return res.json();
  },

  async updateCredential(
    id: number,
    data: {
      name: string;
      link: string;
      landingOrder: number;
      imageField: File | string;
    }
  ): Promise<Credential> {
    const token = localStorage.getItem("token") || "";
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("link", data.link);
    formData.append("landingOrder", data.landingOrder.toString());

    if (data.imageField instanceof File) {
      formData.append("file", data.imageField);
    } else {
      formData.append("imageUrl", data.imageField);
    }

    const res = await fetch(`${API_URL}/credential/credentials/${id}`, {
      method: "PUT",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: formData,
    });

    if (!res.ok) return handleErrorResponse(res);
    return res.json();
  },

  async deleteCredential(id: number): Promise<void> {
    const token = localStorage.getItem("token") || "";
    const res = await fetch(`${API_URL}/credential/credentials/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!res.ok) return handleErrorResponse(res);
  },
};

export const partnerApi = {
  async fetchAllPartners(): Promise<Partner[]> {
    const res = await fetch(`${API_URL}/partners`);
    if (!res.ok) return handleErrorResponse(res);
    return res.json();
  },

  async createPartner(data: Omit<Partner, "id">): Promise<Partner> {
    const token = localStorage.getItem("token") || "";
    const res = await fetch(`${API_URL}/partners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) return handleErrorResponse(res);
    return res.json();
  },

  async updatePartner(
    id: number,
    data: Partial<Omit<Partner, "id">>
  ): Promise<Partner> {
    const token = localStorage.getItem("token") || "";
    const res = await fetch(`${API_URL}/partners/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) return handleErrorResponse(res);
    return res.json();
  },

  async deletePartner(id: number): Promise<void> {
    const token = localStorage.getItem("token") || "";
    const res = await fetch(`${API_URL}/partners/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!res.ok) return handleErrorResponse(res);
  },

  // You can remove this method if you want everyone to use uploadImageAndGetUrl instead
  // async uploadFile(file: File): Promise<{ url: string }> {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   const res = await fetch(`${API_URL}/upload/image`, {
  //     method: "POST",
  //     body: formData,
  //   });
  //   if (!res.ok) throw new Error("Upload failed");
  //   return res.json();
  // },
};
