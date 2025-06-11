import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Drawer } from "../components/Drawer";
import TabRow from "../components/ui/TabRow";
import TabContent from "../components/solutions/TabContent";
import TabForm from "../components/solutions/TabForm";
import ItemForm from "../components/solutions/ItemForm";
import type { SolutionItem, SolutionTab } from "../types";
import { useSolutions } from "../hooks/useSolutionsSection";
import DeleteItemForm from "../components/solutions/DeleteItemForm";
import DeleteTabForm from "../components/solutions/DeleteTabForm";

type DrawerMode =
  | { type: "createTab" }
  | { type: "editTab"; tab: SolutionTab }
  | { type: "deleteTab"; tab: SolutionTab }
  | { type: "createItem"; tabId: number }
  | { type: "editItem"; item: SolutionItem }
  | { type: "deleteItem"; item: SolutionItem }
  | null;

export default function SolutionsPage() {
  const {
    tabs,
    loading,
    error,
    createTab,
    updateTab,
    deleteTab,
    createItem,
    updateItem,
    deleteItem,
    clearError,
  } = useSolutions();

  const [activeTabId, setActiveTabId] = useState<number | null>(null);
  const [drawer, setDrawer] = useState<DrawerMode>(null);

  const [_newTabName, setNewTabName] = useState("");
  const [_newTabTagline, setNewTabTagline] = useState("");
  const [creatingTab, setCreatingTab] = useState(false);
  const [savingTab, setSavingTab] = useState(false);

  const [_newItemTitle, setNewItemTitle] = useState("");
  const [_newItemTag, setNewItemTag] = useState("");
  const [_newItemDescription, setNewItemDescription] = useState("");
  const [creatingItem, setCreatingItem] = useState(false);

  const [savingItem, setSavingItem] = useState(false);

  useEffect(() => {
    if (tabs.length > 0 && activeTabId === null) {
      setActiveTabId(tabs[0].id);
    }
  }, [tabs, activeTabId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  function openCreateTab() {
    setDrawer({ type: "createTab" });
    setNewTabName("");
    setNewTabTagline("");
  }

  async function handleCreateTab(name: string, tagline: string) {
    if (!name.trim() || !tagline.trim()) return;
    setCreatingTab(true);

    try {
      const created = await createTab({ name, tagline });
      setActiveTabId(created.id);
      setDrawer(null);
      toast.success("Tab created!");
    } catch (err: any) {
      toast.error("Error creating tab: " + err.message);
    } finally {
      setCreatingTab(false);
    }
  }

  function openEditTab(tab: SolutionTab) {
    setDrawer({ type: "editTab", tab });
  }

  async function handleSaveTab(name: string, tagline: string) {
    if (drawer?.type !== "editTab") return;
    const tabId = drawer.tab.id;
    setSavingTab(true);

    try {
      await updateTab({ id: tabId, name, tagline });
      setDrawer(null);
      toast.success("Tab updated!");
    } catch (err: any) {
      toast.error("Error updating tab: " + err.message);
    } finally {
      setSavingTab(false);
    }
  }

  function openDeleteTab(tab: SolutionTab) {
    setDrawer({ type: "deleteTab", tab });
  }

  function openCreateItem(tabId: number) {
    setDrawer({ type: "createItem", tabId });
    setNewItemTitle("");
    setNewItemTag("");
    setNewItemDescription("");
  }

  async function handleCreateItem(
    title: string,
    tag: string,
    description: string
  ) {
    if (drawer?.type !== "createItem") return;
    const { tabId } = drawer;
    if (!title || !tag || !description) return;
    setCreatingItem(true);

    try {
      await createItem({ tabId, title, tag, description });
      setDrawer(null);
      toast.success("Item added!");
    } catch (err: any) {
      toast.error("Error adding item: " + err.message);
    } finally {
      setCreatingItem(false);
    }
  }

  function openEditItem(item: SolutionItem) {
    setDrawer({ type: "editItem", item });
  }

  async function handleSaveItem(
    title: string,
    tag: string,
    description: string
  ) {
    if (drawer?.type !== "editItem") return;
    const itemId = drawer.item.id;
    setSavingItem(true);

    try {
      await updateItem({ itemId, title, tag, description });
      setDrawer(null);
      toast.success("Item updated!");
    } catch (err: any) {
      toast.error("Error updating item: " + err.message);
    } finally {
      setSavingItem(false);
    }
  }

  function openDeleteItem(item: SolutionItem) {
    setDrawer({ type: "deleteItem", item });
  }

  const activeTab = tabs.find((t) => t.id === activeTabId) ?? null;

  return (
    <div className="flex h-full">
      <div
        className={`flex-1 transition-[margin] duration-300 ease-in-out ${
          drawer ? "mr-[400px]" : "mr-0"
        }`}
      >
        <TabRow
          tabs={tabs}
          activeTabId={activeTabId}
          loading={loading}
          onSelect={(id) => {
            setActiveTabId(id);
            setDrawer(null);
          }}
          onOpenCreateTab={openCreateTab}
          onDeleteTab={function (): void {
            throw new Error("Function not implemented.");
          }}
        />

        <div className="p-6 flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <span className="text-white/70">Loading content…</span>
            </div>
          ) : !activeTab ? (
            <p className="text-white/60 text-center mt-8">
              Select a tab to view or create items.
            </p>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {activeTab.name}
                    </h3>
                    <p className="text-white/70 mt-1">{activeTab.tagline}</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex space-x-2">
                    <button
                      onClick={() => openEditTab(activeTab)}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md"
                    >
                      Edit Tab
                    </button>
                    <button
                      onClick={() => openDeleteTab(activeTab)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                    >
                      Delete Tab
                    </button>
                  </div>
                </div>
              </div>

              <TabContent
                tab={activeTab}
                onEditItem={openEditItem}
                onDeleteItem={openDeleteItem}
                onOpenCreateItem={openCreateItem}
              />
            </>
          )}
        </div>
      </div>

      <Drawer
        isOpen={drawer !== null}
        onClose={() => setDrawer(null)}
        title={
          drawer?.type === "createTab"
            ? "New Tab"
            : drawer?.type === "editTab"
            ? `Edit "${drawer.tab.name}"`
            : drawer?.type === "createItem"
            ? "New Item"
            : drawer?.type === "editItem"
            ? `Edit "${drawer.item.title}"`
            : ""
        }
      >
        {drawer?.type === "createTab" && (
          <TabForm
            mode="create"
            isSubmitting={creatingTab}
            onCancel={() => setDrawer(null)}
            onSubmit={handleCreateTab}
          />
        )}

        {drawer?.type === "editTab" && (
          <TabForm
            mode="edit"
            initialName={drawer.tab.name}
            initialTagline={drawer.tab.tagline}
            isSubmitting={savingTab}
            onCancel={() => setDrawer(null)}
            onSubmit={handleSaveTab}
          />
        )}

        {drawer?.type === "deleteTab" && (
          <DeleteTabForm
            tab={drawer.tab}
            onCancel={() => setDrawer(null)}
            onConfirm={async (tabId) => {
              setSavingTab(true);
              try {
                await deleteTab(tabId);
                if (activeTabId === tabId) {
                  const remaining = tabs.filter((t) => t.id !== tabId);
                  setActiveTabId(remaining.length > 0 ? remaining[0].id : null);
                }
                setDrawer(null);
                toast.success("Tab deleted!");
              } catch (err: any) {
                toast.error("Error deleting tab: " + err.message);
              } finally {
                setSavingTab(false);
              }
            }}
            isDeleting={savingTab}
          />
        )}

        {drawer?.type === "createItem" && (
          <ItemForm
            mode="create"
            isSubmitting={creatingItem}
            onCancel={() => setDrawer(null)}
            onSubmit={handleCreateItem}
          />
        )}

        {drawer?.type === "editItem" && (
          <ItemForm
            mode="edit"
            initialTitle={drawer.item.title}
            initialTag={drawer.item.tag}
            initialDescription={drawer.item.description}
            isSubmitting={savingItem}
            onCancel={() => setDrawer(null)}
            onSubmit={handleSaveItem}
          />
        )}

        {drawer?.type === "deleteItem" && (
          <DeleteItemForm
            item={drawer.item}
            onCancel={() => setDrawer(null)}
            onConfirm={async (itemId) => {
              setSavingItem(true);
              try {
                await deleteItem(itemId);
                setDrawer(null);
                toast.success("Item deleted!");
              } catch (err: any) {
                toast.error("Error deleting item: " + err.message);
              } finally {
                setSavingItem(false);
              }
            }}
            isDeleting={savingItem}
          />
        )}
      </Drawer>
    </div>
  );
}
