import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Drawer } from "../components/Drawer";
import CredentialForm from "../components/credential/CredentialForm";
import { CredentialPreview } from "../components/credential/CredentialPreview";
import type { Credential } from "../types";
import { useCredentialSection } from "../hooks/useCredentialSection";

const API_URL = import.meta.env.VITE_API_IMAGE_URL;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CredentialPage() {
  const {
    credentials,
    loading,
    error,
    createCredential,
    updateCredential,
    deleteCredential,
  } = useCredentialSection();

  type DrawerMode =
    | { type: "create" }
    | { type: "edit"; credential: Credential }
    | null;

  const [drawerMode, setDrawerMode] = useState<DrawerMode>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleCreate(data: {
    name: string;
    imageField: File | string;
    link: string;
    landingOrder: number;
  }) {
    setSubmitting(true);
    try {
      await createCredential(data);
      toast.success("Member created!");
      setDrawerMode(null);
    } catch (err: any) {
      toast.error("Error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEdit(
    id: number,
    data: {
      name: string;
      imageField: File | string;
      link: string;
      landingOrder: number;
    }
  ) {
    setSubmitting(true);
    try {
      await updateCredential(id, data);
      toast.success("Member updated!");
      setDrawerMode(null);
    } catch (err: any) {
      toast.error("Error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this member?")) return;
    try {
      await deleteCredential(id);
      toast.success("Member deleted!");
      if (drawerMode?.type === "edit" && drawerMode.credential.id === id) {
        setDrawerMode(null);
      }
    } catch (err: any) {
      toast.error("Error deleting member: " + err.message);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div
        className={`flex-1 p-6 overflow-y-auto transition-[margin] duration-300 ease-in-out ${
          drawerMode ? "mr-[400px]" : "mr-0"
        }`}
      >
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <span className="text-white/70">Loading…</span>
          </div>
        ) : error ? (
          <div className="text-red-400 text-center mb-4">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* “Add Member” card */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="show"
              className="relative"
            >
              <div
                onClick={() => setDrawerMode({ type: "create" })}
                className="
                 aspect-3/4 bg-white/5 border-2 border-dashed border-white/20
                  hover:border-white/40 rounded-lg cursor-pointer transition-all
                  duration-200 flex items-center justify-center group hover:bg-white/10
                "
              >
                <div className="text-center">
                  <div className="text-4xl text-white/40 group-hover:text-white/60 transition-colors duration-200 mb-2">
                    +
                  </div>
                  <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-200">
                    Add Member
                  </p>
                </div>
              </div>
            </motion.div>
            {credentials.map((credential) => (
              <motion.div
                key={credential.id}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                className="relative group"
              >
                <CredentialPreview
                  name={credential.name}
                  imageUrl={`${API_URL}${credential.imageUrl}`}
                  onClick={() => setDrawerMode({ type: "edit", credential })}
                />

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDrawerMode({ type: "edit", credential });
                    }}
                    className="mr-2 p-1 bg-white/10 hover:bg-white/20 text-white rounded-md"
                  >
                    ✎
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(credential.id);
                    }}
                    className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  >
                    🗑
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Drawer
        isOpen={drawerMode !== null}
        onClose={() => setDrawerMode(null)}
        title={
          drawerMode?.type === "create"
            ? "Add Member"
            : drawerMode?.type === "edit"
            ? `Edit “${drawerMode.credential.name}”`
            : ""
        }
      >
        {drawerMode?.type === "edit" ? (
          <CredentialForm
            mode="edit"
            initialData={drawerMode.credential}
            isSubmitting={submitting}
            onCancel={() => setDrawerMode(null)}
            onSubmit={handleEdit}
          />
        ) : (
          <CredentialForm
            mode="create"
            isSubmitting={submitting}
            onCancel={() => setDrawerMode(null)}
            onSubmit={handleCreate}
          />
        )}
      </Drawer>
    </div>
  );
}
