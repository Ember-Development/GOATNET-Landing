import { useState, useEffect, type FormEvent } from "react";
import type { Credential } from "../../types";
import ImageUploader from "../ui/ImageUploader";
import { CredentialPreview } from "./CredentialPreview";
import { TabSwitcher } from "../showcase/TabSwitcher";

interface BaseProps {
  onCancel: () => void;
}

interface CreateProps extends BaseProps {
  mode: "create";
  onSubmit: (data: {
    name: string;
    imageField: File | string;
    link: string;
    landingOrder: number;
  }) => void;
  isSubmitting: boolean;
}

interface EditProps extends BaseProps {
  mode: "edit";
  initialData: Credential;
  onSubmit: (
    id: number,
    data: {
      name: string;
      imageField: File | string;
      link: string;
      landingOrder: number;
    }
  ) => void;
  isSubmitting: boolean;
}

type CredentialFormProps = CreateProps | EditProps;

export default function CredentialForm(props: CredentialFormProps) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [landingOrder, setLandingOrder] = useState(0);
  const [imageField, setImageField] = useState<File | string>("");

  const [activeTab, setActiveTab] = useState<"info" | "preview">("info");

  // When in “edit” mode, preload the existing values:
  useEffect(() => {
    if (props.mode === "edit") {
      const { initialData } = props;
      setName(initialData.name);
      setLink(initialData.link);
      setLandingOrder(initialData.landingOrder);
      setImageField(initialData.imageUrl);
    } else {
      setName("");
      setLink("");
      setLandingOrder(0);
      setImageField("");
    }
  }, [
    props.mode,
    props.mode === "edit" ? (props as EditProps).initialData : undefined,
  ]);

  // preview‐able URL from imageField:
  let previewImageUrl = "";
  if (typeof imageField === "string") {
    previewImageUrl = imageField;
  } else {
    previewImageUrl = URL.createObjectURL(imageField);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (props.mode === "create") {
      props.onSubmit({ name, imageField, link, landingOrder });
    } else {
      props.onSubmit(props.initialData.id, {
        name,
        imageField,
        link,
        landingOrder,
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <TabSwitcher
        tabs={[
          { id: "info", label: "Info" },
          { id: "preview", label: "Preview" },
        ]}
        activeTab={activeTab}
        onChange={(id: string) => setActiveTab(id as "info" | "preview")}
      />

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "info" ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="credentialName"
                className="block text-sm font-medium text-white/80 mb-1"
              >
                Name
              </label>
              <input
                id="credentialName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="credentialLink"
                className="block text-sm font-medium text-white/80 mb-1"
              >
                Link (optional)
              </label>
              <input
                id="credentialLink"
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label
                htmlFor="landingOrder"
                className="block text-sm font-medium text-white/80 mb-1"
              >
                Display Order
              </label>
              <input
                id="landingOrder"
                type="number"
                value={landingOrder}
                onChange={(e) => setLandingOrder(+e.target.value)}
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
                onChange={(val: File | string) => setImageField(val)}
              />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
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
                className={`px-4 py-2 flex items-center justify-center gap-2 
                  bg-gradient-to-r from-purple-600 to-indigo-600 
                  hover:opacity-90 text-white font-semibold rounded-lg transition ${
                    props.isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                  }`}
              >
                {props.mode === "create" ? "Create" : "Save"}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <CredentialPreview
              name={name || "Name"}
              imageUrl={previewImageUrl || "/placeholder.png"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
