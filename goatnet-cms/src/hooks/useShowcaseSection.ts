// src/hooks/useShowcaseSection.ts
import { useState, useEffect } from "react";
import { attractionApi } from "../utils/api";
import type { Attraction } from "../types";

export const useShowcaseSection = () => {
  const [items, setItems] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await attractionApi.fetchShowcase();
      setItems(data);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData: {
    title: string;
    description: string;
    imageUrl: string;
    videoUrl: string;
    type: string;
    channels: string[];
    showOnLanding: boolean;
    landingOrder?: number;
    studioId: string;
  }) => {
    try {
      setError(null);
      const { description, ...rest } = itemData;
      const newItem = await attractionApi.createItem({
        ...rest,
        caption: description,
      });
      setItems((prev) => [...prev, newItem]);
      return newItem;
    } catch (err: any) {
      const msg = err instanceof Error ? err.message : "Failed to create item";
      setError(msg);
      throw new Error(msg);
    }
  };

  const updateItem = async (
    id: string,
    itemData: Partial<{
      title: string;
      description: string;
      imageUrl: string;
      videoUrl: string;
      type: string;
      channels: string[];
      showOnLanding: boolean;
      landingOrder?: number;
    }>
  ) => {
    try {
      setError(null);
      const updatedItem = await attractionApi.updateItem({ id, ...itemData });
      setItems((prev) =>
        prev.map((it) => (it.id === updatedItem.id ? updatedItem : it))
      );
      return updatedItem;
    } catch (err: any) {
      const msg = err instanceof Error ? err.message : "Failed to update item";
      setError(msg);
      throw new Error(msg);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      setError(null);
      await attractionApi.deleteItem(id);
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (err: any) {
      const msg = err instanceof Error ? err.message : "Failed to delete item";
      setError(msg);
      throw new Error(msg);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    refetch: fetchItems,
    createItem,
    updateItem,
    deleteItem,
  };
};
