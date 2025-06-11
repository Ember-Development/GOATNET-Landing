// src/layouts/DashboardLayout.tsx
import Panel from "../components/Panel";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";

export default function DashboardLayout({
  children,
  header,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative text-white overflow-hidden bg-gradient-to-br from-neutral-900 via-gray-900 to-black">
      {" "}
      <Sidebar />
      <TopNav />
      <main className="pt-20 pl-24 pr-6">
        <Panel header={header}>{children}</Panel>
      </main>
    </div>
  );
}
