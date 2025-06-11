import { Link, useLocation } from "react-router-dom";
import {
  FileUser,
  Handshake,
  Headset,
  Home,
  Info,
  Star,
  TvMinimal,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const routes = [
    {
      to: "/dashboard/home",
      icon: <Home className="w-5 h-5" />,
      label: "Home",
    },
    {
      to: "/dashboard/hero",
      icon: <Star className="w-5 h-5" />,
      label: "Hero",
    },
    {
      to: "/dashboard/about",
      icon: <Info className="w-5 h-5" />,
      label: "About",
    },
    {
      to: "/dashboard/solutions",
      icon: <Headset className="w-5 h-5" />,
      label: "About",
    },
    {
      to: "/dashboard/showcase",
      icon: <TvMinimal className="w-5 h-5" />,
      label: "About",
    },
    {
      to: "/dashboard/credentials",
      icon: <FileUser className="w-5 h-5" />,
      label: "About",
    },
    {
      to: "/dashboard/partners",
      icon: <Handshake className="w-5 h-5" />,
      label: "About",
    },
  ];

  return (
    <aside className="fixed top-6 left-6 h-[91vh] w-14  backdrop-blur-2xl rounded-2xl shadow-glass flex flex-col items-center gap-6 py-6">
      {routes.map(({ to, icon, label }) => (
        <Link
          key={to}
          to={to}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition ${
            location.pathname === to
              ? "bg-white/20 text-white"
              : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"
          }`}
          title={label}
        >
          {icon}
        </Link>
      ))}
    </aside>
  );
}
