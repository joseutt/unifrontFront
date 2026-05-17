import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  Award,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/UnifrontLogo.png";

const items = [
  {
    icon: LayoutDashboard,
    label: "Panel",
    path: "/dashboard",
    roles: ["ADMIN", "DOCENTE"],
  },

  {
    icon: Users,
    label: "Alumnos",
    path: "/alumnos",
    roles: ["ADMIN"],
  },

  {
    icon: BookOpen,
    label: "Plan de estudios",
    path: "/planes-estudio",
    roles: ["ADMIN", "DOCENTE"],
  },

  {
    icon: ClipboardList,
    label: "Captura",
    path: "/captura",
    roles: ["DOCENTE"],
  },

  {
    icon: Award,
    label: "Cuadro de honor",
    path: "/cuadro-honor",
    roles: ["ADMIN"],
  },
];

function Sidebar() {
  const { logout, user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-[var(--sidebar)] text-[var(--sidebar-foreground)] min-h-screen p-4 flex flex-col">
      {/* Logo */}
      <div className="flex justify-center bg-[var(--primary)] p-3 rounded-xl">
        <img src={logo} alt="Logo Unifront" height={24} />
      </div>

      <div className="flex items-center gap-3 mb-10"></div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {items
          .filter((item) =>
            item.roles.some((role) =>
              user?.roles?.some((userRole) => userRole.nombre === role),
            ),
          )
          .map((item) => {
            const Icon = item.icon;

            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-[var(--primary)] text-white"
                    : "hover:bg-[var(--sidebar-accent)]"
                }`}
              >
                <Icon size={18} />

                <span>{item.label}</span>
              </button>
            );
          })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-6 w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-300 hover:bg-red-500/20 transition"
      >
        <LogOut size={18} />

        <span>Cerrar sesión</span>
      </button>
    </aside>
  );
}

export default Sidebar;
