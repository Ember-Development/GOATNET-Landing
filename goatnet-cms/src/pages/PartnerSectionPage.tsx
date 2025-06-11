import React, { useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { usePartnersSection } from "../hooks/usePartnerSection";
import { PartnerForm } from "../components/partner/PartnerForm";
const API_URL = import.meta.env.VITE_API_IMAGE_URL;

export default function PartnersPage() {
  const {
    partners,
    loading,
    error,
    createPartner,
    updatePartner,
    deletePartner,
  } = usePartnersSection();

  const [activeId, setActiveId] = useState<number | null>(null);

  const [drawerMode, setDrawerMode] = useState<
    { type: "create" } | { type: "edit"; partnerId: number } | null
  >(null);

  const openCreate = () => {
    setActiveId(null);
    setDrawerMode({ type: "create" });
  };

  const openEdit = (id: number) => {
    setActiveId(id);
    setDrawerMode({ type: "edit", partnerId: id });
  };

  const closeDrawer = () => {
    setActiveId(null);
    setDrawerMode(null);
  };

  const handleCreate = async (data: {
    name: string;
    link: string;
    order: number;
    imageField: File | string;
  }) => {
    try {
      await createPartner(data.name, data.link, data.order, data.imageField);
      toast.success("Partner created!");
      closeDrawer();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleUpdate = async (
    id: number,
    data: {
      name: string;
      link: string;
      order: number;
      imageField: File | string;
    }
  ) => {
    try {
      await updatePartner(
        id,
        data.name,
        data.link,
        data.order,
        data.imageField
      );
      toast.success("Partner updated!");
      closeDrawer();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this partner?")) return;
    try {
      await deletePartner(id);
      toast.success("Partner deleted!");
      if (activeId === id) closeDrawer();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  let drawerProps: React.ComponentProps<typeof PartnerForm> | null = null;
  if (drawerMode) {
    if (drawerMode.type === "create") {
      drawerProps = {
        mode: "create",
        onCancel: closeDrawer,
        onSubmit: handleCreate,
        isSubmitting: false,
      };
    } else {
      const p = partners.find((x) => x.id === drawerMode.partnerId)!;
      drawerProps = {
        mode: "edit",
        initialData: p,
        onCancel: closeDrawer,
        onSubmit: (id, data) => handleUpdate(id, data),
        isSubmitting: false,
      };
    }
  }

  return (
    <div className="flex h-full">
      <div
        className={`flex-1 transition-[margin] duration-300 ease-in-out ${
          drawerMode ? "mr-[400px]" : "mr-0"
        }`}
      >
        <div className="p-6 overflow-y-auto h-full">
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <span className="text-white/70">Loading partners…</span>
            </div>
          ) : error ? (
            <div className="text-red-400 text-center">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div
                onClick={openCreate}
                className="relative group flex flex-col items-center p-4 sm:p-6 hover:scale-105 transition-transform cursor-pointer"
              >
                <div
                  className="snap-start flex flex-col items-center bg-white/10 backdrop-blur-lg border-2 border-dashed border-white/20 p-4 sm:p-6 hover:border-white/40 rounded-lg transition-all
                  duration-200 group min-w-[140px] sm:min-w-[200px] lg:min-w-[240px]"
                >
                  <Plus className="w-8 h-8 text-white/60 mb-3 sm:mb-4" />
                  <p className="mt-3 text-white/70 font-semibold text-center text-sm sm:text-base">
                    Add Partner
                  </p>
                </div>
              </div>
              {partners.map((p) => (
                <div
                  key={p.id}
                  className={`
                    relative group flex flex-col items-center 
                   
                    p-4 sm:p-6 hover:scale-105 transition-transform
                    cursor-pointer
                    
                    `}
                  onClick={() => openEdit(p.id)}
                >
                  <div className="snap-start flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-4 sm:p-6 hover:scale-105 transition-transform min-w-[140px] sm:min-w-[200px] lg:min-w-[240px]">
                    <img
                      src={`${API_URL}${p.imageUrl}`}
                      alt={p.name}
                      className="h-16 sm:h-20 object-contain mb-3 sm:mb-4 rounded-md"
                    />
                  </div>
                  <p className="mt-3 text-white font-semibold text-center text-sm sm:text-base">
                    {p.name}
                  </p>

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(p.id);
                      }}
                      className="mr-2 p-1 bg-white/10 hover:bg-white/20 text-white rounded-md"
                    >
                      ✎
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(p.id);
                      }}
                      className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {drawerProps && <PartnerForm {...drawerProps} />}
    </div>
  );
}
