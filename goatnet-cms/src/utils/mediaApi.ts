const API_URL = import.meta.env.VITE_API_URL || "";

export async function uploadImageAndGetUrl(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload/image`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => null);
    throw new Error(errJson?.error || "Image upload failed");
  }
  const { url } = await res.json();
  return url;
}

export async function uploadVideoAndGetUrl(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload/video`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => null);
    throw new Error(errJson?.error || "Video upload failed");
  }
  const { url } = await res.json();
  return url;
}
