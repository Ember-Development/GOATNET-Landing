import React, { useState, useEffect } from "react";
import { Drawer } from "../Drawer";
import { PartnerPreview } from "./PartnerPreview";
import type { Partner } from "../../types";
import ImageUploader from "../ui/ImageUploader";

interface BaseProps {
  onCancel: () => void;
}

interface CreatePartnerFormProps extends BaseProps {
  mode: "create";
  onSubmit: (data: {
    name: string;
    link: string;
    order: number;
    imageField: File | string;
  }) => void;
  isSubmitting: boolean;
}

interface EditPartnerFormProps extends BaseProps {
  mode: "edit";
  initialData: Partner;
  onSubmit: (
    id: number,
    data: {
      name: string;
      link: string;
      order: number;
      imageField: File | string;
    }
  ) => void;
  isSubmitting: boolean;
}

type PartnerFormProps = CreatePartnerFormProps | EditPartnerFormProps;

export function PartnerForm(props: PartnerFormProps) {
  const [activeTab, setActiveTab] = useState<"info" | "preview">("info");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [order, setOrder] = useState<number>(0);
  const [imageField, setImageField] = useState<File | string>("");

  useEffect(() => {
    if (props.mode === "edit") {
      setName(props.initialData.name);
      setLink(props.initialData.link);
      setOrder(props.initialData.order);
      setImageField(props.initialData.imageUrl);
    }
  }, [props]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (props.mode === "create") {
      props.onSubmit({ name, link, order, imageField });
    } else {
      props.onSubmit(props.initialData.id, { name, link, order, imageField });
    }
  };

  // Preview URL
  let previewImageUrl = "";
  if (typeof imageField === "string") {
    previewImageUrl = imageField;
  } else {
    previewImageUrl = URL.createObjectURL(imageField);
  }

  const drawerTitle =
    props.mode === "create"
      ? "Create Partner"
      : `Edit “${props.initialData.name}”`;

  return (
    <Drawer isOpen={true} onClose={props.onCancel} title={drawerTitle}>
      <div className="flex border-b border-white/20 mb-4">
        <button
          onClick={() => setActiveTab("info")}
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "info"
              ? "border-b-2 border-purple-500 text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          Info
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "preview"
              ? "border-b-2 border-purple-500 text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          Preview
        </button>
      </div>

      {activeTab === "info" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="partnerName"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Name
            </label>
            <input
              id="partnerName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="partnerLink"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Link
            </label>
            <input
              id="partnerLink"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="partnerOrder"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Display Order
            </label>
            <input
              id="partnerOrder"
              type="number"
              value={order}
              onChange={(e) => setOrder(+e.target.value)}
              className="w-24 bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Image
            </label>
            <ImageUploader
              initialUrl={
                typeof imageField === "string" ? imageField : undefined
              }
              onChange={(val) => setImageField(val)}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={props.onCancel}
              className="px-4 py-2 text-white/60 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={props.isSubmitting}
              className={`px-4 py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-semibold rounded-lg transition ${
                props.isSubmitting ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {props.mode === "create" ? "Create" : "Save"}
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-center pt-8">
          <PartnerPreview
            name={name || "Name"}
            imageUrl={previewImageUrl || ""}
            link={link || "#"}
            id={0}
            order={0}
          />
        </div>
      )}
    </Drawer>
  );
}
