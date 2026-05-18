import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { LogOut } from "lucide-react";
import logo from "../assets/UnifrontLogo.png";
import { sidebarSections } from "../config/sidebarSections";
import SidebarSection from "./sidebar/SidebarSection";

function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [openSections, setOpenSections] = useState({
    General: true,
    Académico: true,
    Escolar: true,
    Docentes: true,
    Administración: true,
  });

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <aside className="flex min-h-screen w-72 flex-col bg-[var(--sidebar)] p-4 text-[var(--sidebar-foreground)]">
      {/* Logo */}
      <div className="rounded-2xl bg-[var(--primary)] p-4 shadow-lg">
        <div className="flex justify-center">
          <img src={logo} alt="Logo Unifront" className="h-14 object-contain" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex-1 space-y-6 overflow-y-auto">
        {sidebarSections.map((section) => {
          const visibles = section.items.filter((item) =>
            item.roles.some((role) =>
              user?.roles?.some((userRole) => userRole.nombre === role),
            ),
          );

          if (visibles.length === 0) return null;

          return (
            <SidebarSection
              key={section.title}
              section={section}
              visibles={visibles}
              isOpen={openSections[section.title]}
              onToggle={() => toggleSection(section.title)}
              pathname={location.pathname}
              navigate={navigate}
            />
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-6 flex w-full items-center gap-3 rounded-xl bg-red-500/10 px-4 py-3 text-red-300 transition hover:bg-red-500/20"
      >
        <LogOut size={18} />

        <span>Cerrar sesión</span>
      </button>
    </aside>
  );
}

export default Sidebar;
