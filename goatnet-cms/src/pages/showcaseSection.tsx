import { useState } from "react";
import toast from "react-hot-toast";
import { Drawer } from "../components/Drawer";
import ShowcaseGrid from "../components/showcase/ShowcaseGrid";
import ShowcaseForm from "../components/showcase/ShowcaseForm";
import type { Attraction } from "../types";
import { useShowcaseSection } from "../hooks/useShowcaseSection";
import { uploadImageAndGetUrl } from "../utils/api";

export default function ShowcasePage() {
  const { items, loading, createItem, updateItem, deleteItem } =
    useShowcaseSection();

  const [drawer, setDrawer] = useState<
    { type: "create" } | { type: "edit"; item: Attraction } | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function openCreate() {
    setDrawer({ type: "create" });
  }

  async function handleCreate(dataFromForm: {
    title: string;
    description: string;
    image: File | string;
    videoUrl: string;
    type: string;
    channels: string[];
    showOnLanding: boolean;
    landingOrder?: number;
    studioId: string;
  }) {
    setIsSubmitting(true);
    try {
      let imageUrl: string;
      if (typeof dataFromForm.image === "string") {
        imageUrl = dataFromForm.image;
      } else {
        if (!dataFromForm.image.type.startsWith("image/")) {
          throw new Error("Please select a valid image file");
        }
        imageUrl = await uploadImageAndGetUrl(dataFromForm.image);
      }

      const videoUrl = dataFromForm.videoUrl.trim();

      await createItem({
        title: dataFromForm.title,
        description: dataFromForm.description,
        imageUrl,
        videoUrl,
        type: dataFromForm.type,
        channels: dataFromForm.channels,
        showOnLanding: dataFromForm.showOnLanding,
        landingOrder: dataFromForm.landingOrder,
        studioId: dataFromForm.studioId,
      });

      setDrawer(null);
      toast.success("Attraction created!");
    } catch (err: any) {
      toast.error("Error creating attraction: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function openEdit(item: Attraction) {
    setDrawer({ type: "edit", item });
  }

  async function handleEdit(dataFromForm: {
    title: string;
    description: string;
    image: File | string;
    videoUrl: string;
    type: string;
    channels: string[];
    showOnLanding: boolean;
    landingOrder?: number;
  }) {
    if (drawer?.type !== "edit") return;
    setIsSubmitting(true);
    try {
      let imageUrl: string;
      if (typeof dataFromForm.image === "string") {
        imageUrl = dataFromForm.image;
      } else {
        if (!dataFromForm.image.type.startsWith("image/")) {
          throw new Error("Please select a valid image file");
        }
        imageUrl = await uploadImageAndGetUrl(dataFromForm.image);
      }

      const videoUrl = dataFromForm.videoUrl.trim();

      await updateItem(drawer.item.id, {
        title: dataFromForm.title,
        description: dataFromForm.description,
        imageUrl,
        videoUrl,
        type: dataFromForm.type,
        channels: dataFromForm.channels,
        showOnLanding: dataFromForm.showOnLanding,
        landingOrder: dataFromForm.landingOrder,
      });

      setDrawer(null);
      toast.success("Attraction updated!");
    } catch (err: any) {
      toast.error("Error updating attraction: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this attraction?")) return;
    try {
      await deleteItem(id);
      toast.success("Attraction deleted!");
    } catch (err: any) {
      toast.error("Error deleting attraction: " + err.message);
    }
  }

  return (
    <div className="flex h-full">
      <div
        className={`flex-1 p-6 transition-[margin] duration-300 ease-in-out ${
          drawer ? "mr-[400px]" : "mr-0"
        }`}
      >
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <span className="text-white/70">Loading…</span>
          </div>
        ) : items.length === 0 ? (
          <p className="text-white/60">No attractions found.</p>
        ) : (
          <ShowcaseGrid
            items={items}
            onEdit={openEdit}
            onDelete={handleDelete}
            onAddNew={openCreate}
          />
        )}
      </div>

      <Drawer
        isOpen={drawer !== null}
        onClose={() => setDrawer(null)}
        title={
          drawer?.type === "create"
            ? "New Attraction"
            : drawer?.type === "edit"
            ? `Edit "${drawer.item.title}"`
            : ""
        }
      >
        {drawer?.type === "create" && (
          <ShowcaseForm
            mode="create"
            isSubmitting={isSubmitting}
            onCancel={() => setDrawer(null)}
            onSubmit={handleCreate}
          />
        )}

        {drawer?.type === "edit" && (
          <ShowcaseForm
            mode="edit"
            initialData={drawer.item}
            isSubmitting={isSubmitting}
            onCancel={() => setDrawer(null)}
            onSubmit={handleEdit}
          />
        )}
      </Drawer>
    </div>
  );
}
