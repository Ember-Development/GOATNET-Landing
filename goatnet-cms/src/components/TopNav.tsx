import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../helper/auth";
import logoImage from "../assets/goat.png";

export default function TopNav() {
  const navigate = useNavigate();
  const token = getToken();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <header className="fixed top-6 left-24 right-6 z-50 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-glass px-6 py-3 flex items-center justify-between">
      <img
        src={logoImage}
        alt="GOATNET CMS"
        className="h-6 w-auto opacity-90 filter brightness-110" // matches text-white/90 look
      />

      {token && (
        <div className="flex items-center gap-4">
          <button className="text-white/70 hover:text-white transition">
            Dashboard
          </button>
          <button className="text-white/70 hover:text-white transition">
            Settings
          </button>
          <button
            onClick={logout}
            className="text-white/70 hover:text-red-400 transition"
          >
            Logout
          </button>

          <div className="w-9 h-9 rounded-full bg-white/20 border border-white/20 flex items-center justify-center text-sm font-medium text-white/80">
            👤
          </div>
        </div>
      )}
    </header>
  );
}
