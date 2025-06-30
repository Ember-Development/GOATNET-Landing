import { useState, useEffect, useCallback } from "react";
import type { Credential } from "../types";
import { credentialApi } from "../utils/api";

export function useCredentialSection() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all credentials from the server
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await credentialApi.fetchAllCredentials();
      setCredentials(data);
    } catch (err: any) {
      setError(err.message || "Failed to load credentials");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Create a new credential
  const createCredential = useCallback(
    async (vals: {
      name: string;
      link: string;
      landingOrder: number;
      imageField: File | string;
    }) => {
      setError(null);
      try {
        const newCred = await credentialApi.createCredential(vals);
        setCredentials((prev) => [...prev, newCred]);
        return newCred;
      } catch (err: any) {
        const m = err.message || "Failed to create credential";
        setError(m);
        throw new Error(m);
      }
    },
    []
  );

  // Update an existing credential
  const updateCredential = useCallback(
    async (
      id: number,
      vals: {
        name: string;
        link: string;
        landingOrder: number;
        imageField: File | string;
      }
    ) => {
      setError(null);
      try {
        const updated = await credentialApi.updateCredential(id, vals);
        setCredentials((prev) => prev.map((c) => (c.id === id ? updated : c)));
        return updated;
      } catch (err: any) {
        const m = err.message || "Failed to update credential";
        setError(m);
        throw new Error(m);
      }
    },
    []
  );

  // Delete a credential
  const deleteCredential = useCallback(async (id: number) => {
    setError(null);
    try {
      await credentialApi.deleteCredential(id);
      setCredentials((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      const m = err.message || "Failed to delete credential";
      setError(m);
      throw new Error(m);
    }
  }, []);

  return {
    credentials,
    loading,
    error,
    refetch: fetchAll,
    createCredential,
    updateCredential,
    deleteCredential,
  };
}
