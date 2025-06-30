import { useState, useEffect, useCallback } from "react";
import { partnerApi, uploadImageAndGetUrl } from "../utils/api";
import type { Partner } from "../types";

export function usePartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await partnerApi.fetchAllPartners();
      setPartners(data);
    } catch (err: any) {
      setError(err.message || "Failed to load partners");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const createPartner = useCallback(
    async (
      name: string,
      link: string,
      order: number,
      imageField: File | string
    ) => {
      setError(null);
      let imageUrl: string;

      // If the field is a File, upload first; else assume `string` is URL
      if (imageField instanceof File) {
        imageUrl = await uploadImageAndGetUrl(imageField);
      } else {
        imageUrl = imageField;
      }

      const newPartner = await partnerApi.createPartner({
        name,
        link,
        order,
        imageUrl,
      });
      setPartners((prev) => [...prev, newPartner]);
      return newPartner;
    },
    []
  );

  const updatePartner = useCallback(
    async (
      id: number,
      name: string,
      link: string,
      order: number,
      imageField: File | string
    ) => {
      setError(null);
      let imageUrl: string;
      if (imageField instanceof File) {
        imageUrl = await uploadImageAndGetUrl(imageField);
      } else {
        imageUrl = imageField;
      }

      const updated = await partnerApi.updatePartner(id, {
        name,
        link,
        order,
        imageUrl,
      });
      setPartners((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    },
    []
  );

  const deletePartner = useCallback(async (id: number) => {
    setError(null);
    await partnerApi.deletePartner(id);
    setPartners((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return {
    partners,
    loading,
    error,
    refetch: fetchAll,
    createPartner,
    updatePartner,
    deletePartner,
  };
}
