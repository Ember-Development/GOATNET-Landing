import { useState, useEffect } from "react";
import type { SolutionTab, SolutionItem } from "../types";
import { solutionsApi } from "../utils/api";

interface UseSolutionsState {
  tabs: SolutionTab[];
  loading: boolean;
  error: string | null;
}

interface UseSolutionsActions {
  fetchTabs: () => Promise<void>;
  createTab: (data: { name: string; tagline: string }) => Promise<SolutionTab>;
  updateTab: (data: {
    id: number;
    name: string;
    tagline: string;
  }) => Promise<SolutionTab>;
  deleteTab: (tabId: number) => Promise<void>;
  createItem: (data: {
    tabId: number;
    title: string;
    tag: string;
    description: string;
  }) => Promise<SolutionItem>;
  updateItem: (data: {
    itemId: number;
    title: string;
    tag: string;
    description: string;
  }) => Promise<SolutionItem>;
  deleteItem: (itemId: number) => Promise<void>;
  clearError: () => void;
}

export function useSolutions(): UseSolutionsState & UseSolutionsActions {
  const [state, setState] = useState<UseSolutionsState>({
    tabs: [],
    loading: false,
    error: null,
  });

  const setLoading = (loading: boolean) => {
    setState((prev) => ({ ...prev, loading }));
  };

  const setError = (error: string | null) => {
    setState((prev) => ({ ...prev, error, loading: false }));
  };

  const setTabs = (tabs: SolutionTab[]) => {
    setState((prev) => ({ ...prev, tabs, loading: false, error: null }));
  };

  const fetchTabs = async () => {
    try {
      setLoading(true);
      const tabs = await solutionsApi.fetchAllTabs();
      setTabs(tabs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tabs");
    }
  };

  const createTab = async (data: {
    name: string;
    tagline: string;
  }): Promise<SolutionTab> => {
    try {
      setLoading(true);
      const newTab = await solutionsApi.createTab(data);
      setState((prev) => ({
        ...prev,
        tabs: [...prev.tabs, newTab],
        loading: false,
        error: null,
      }));
      return newTab;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create tab");
      throw err;
    }
  };

  const updateTab = async (data: {
    id: number;
    name: string;
    tagline: string;
  }): Promise<SolutionTab> => {
    try {
      setLoading(true);
      const updatedTab = await solutionsApi.updateTab(data);
      setState((prev) => ({
        ...prev,
        tabs: prev.tabs.map((tab) => (tab.id === data.id ? updatedTab : tab)),
        loading: false,
        error: null,
      }));
      return updatedTab;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update tab");
      throw err;
    }
  };

  const deleteTab = async (tabId: number): Promise<void> => {
    try {
      setLoading(true);
      await solutionsApi.deleteTab(tabId);
      setState((prev) => ({
        ...prev,
        tabs: prev.tabs.filter((tab) => tab.id !== tabId),
        loading: false,
        error: null,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete tab");
      throw err;
    }
  };

  const createItem = async (data: {
    tabId: number;
    title: string;
    tag: string;
    description: string;
  }): Promise<SolutionItem> => {
    try {
      setLoading(true);
      const newItem = await solutionsApi.createItem(data);
      setState((prev) => ({
        ...prev,
        tabs: prev.tabs.map((tab) =>
          tab.id === data.tabId
            ? { ...tab, items: [...(tab.items || []), newItem] }
            : tab
        ),
        loading: false,
        error: null,
      }));
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create item");
      throw err;
    }
  };

  const updateItem = async (data: {
    itemId: number;
    title: string;
    tag: string;
    description: string;
  }): Promise<SolutionItem> => {
    try {
      setLoading(true);
      const updatedItem = await solutionsApi.updateItem(data);
      setState((prev) => ({
        ...prev,
        tabs: prev.tabs.map((tab) => ({
          ...tab,
          items:
            tab.items?.map((item) =>
              item.id === data.itemId ? updatedItem : item
            ) || [],
        })),
        loading: false,
        error: null,
      }));
      return updatedItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update item");
      throw err;
    }
  };

  const deleteItem = async (itemId: number): Promise<void> => {
    try {
      setLoading(true);
      await solutionsApi.deleteItem(itemId);
      setState((prev) => ({
        ...prev,
        tabs: prev.tabs.map((tab) => ({
          ...tab,
          items: tab.items?.filter((item) => item.id !== itemId) || [],
        })),
        loading: false,
        error: null,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
      throw err;
    }
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    fetchTabs();
  }, []);

  return {
    ...state,
    fetchTabs,
    createTab,
    updateTab,
    deleteTab,
    createItem,
    updateItem,
    deleteItem,
    clearError,
  };
}
